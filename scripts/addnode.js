// Run this script from Primary to add a new node (e.g. replica 3 in this case)
rs.add( { host: "replica3:27017", priority: 0, votes: 0 } )

// Once the newly added member has transitioned into SECONDARY state, use
// rs.reconfig() to update the newly added member’s priority and votes if
// needed.
