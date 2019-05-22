rs.initiate( {
   _id : "myReplicaSet",
   members: [
      { _id: 0, host: "replica1:27017" },
      { _id: 1, host: "replica2:27017" },
   ]
})

// After this you can query normally from secondaries.
rs.slaveOk()

