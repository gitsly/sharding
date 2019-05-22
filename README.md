# sharding
Test mongodb sharding and replica sets

## Links
Super good explanation about sharding vs replication:
https://dba.stackexchange.com/questions/52632/difference-between-sharding-and-replication-on-mongodb

A Replica-Set means that you have multiple instances of MongoDB which each
mirror all the data of each other. A replica-set consists of one Master (also
called "Primary") and one or more Slaves (aka Secondary). Read-operations can
be served by any slave, so you can increase read-performance by adding more
slaves to the replica-set (provided that your client application is capable to
actually use different set-members). But write-operations always take place on
the master of the replica-set and are then propagated to the slaves, so writes
won't get faster when you add more slaves.

Replica-sets also offer fault-tolerance. When one of the members of the
replica-set goes down, the others take over. When the master goes down, the
slaves will elect a new master. For that reason it is suggested for productive
deployment to always use MongoDB as a replica-set of at least three servers,
two of them holding data (the third one is a data-less "arbiter" which is
required for determining a new master when one of the slaves goes down).

A Sharded Cluster means that each shard of the cluster (which can also be a
replica-set) takes care of a part of the data. Each request, both reads and
writes, is served by the cluster where the data resides. This means that both
read- and write performance can be increased by adding more shards to a
cluster. Which document resides on which shard is determined by the shard key
of each collection. It should be chosen in a way that the data can be evenly
distributed on all clusters and so that it is clear for the most common queries
where the shard-key resides (example: when you frequently query by user_name,
your shard-key should include the field user_name so each query can be
delegated to only the one shard which has that document).

The drawback is that the fault-tolerance suffers. When one shard of the cluster
goes down, any data on it is inaccessible. For that reason each member of the
cluster should also be a replica-set. This is not required. When you don't care
about high-availability, a shard can also be a single mongod instance without
replication. But for production-use you should always use replication.

