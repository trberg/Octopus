May 5, 2023
We tried to fix the links, it didn't work.

May 12, 2023
1. Continue working on fixing the paths so they don't fill. (FIXED)
2. Discuss layout approach on change. (Discussed)

May 19, 2023
1. We need to look at the sugyama documentation. We are trying to control the horizontal ordering of the nodes on a layer. Can we 
directly calculate the distance between nodes per layer.
2. Possibly, work on importing private functions from d3-dag library. Need to breakout the sugyama algorithm. Siggie not convinced.

July 28, 2023
1. We successfuly did git diff
2. Circle sizes are either not being calculated or are not rendering
3. Fix repository branches, origins, mains, and masters.

August 25, 2023
1. Kind of solved the circle issue.
2. clicked circle not following proper movement pattern.
3. code is in master, not in main. Update default
4. Need to look into functions enter, update, and exit. May have been changed in new D3.
5. Update seems to be doing most of the heavy lifting in terms of calculating initial location and transitions. Not sure why.
6. Update function not applying to on-clicked circle.

September 8, 2023
1. GRAPH IS WORKING
2. Pulling in children from api 
3. Pulling in parents from api 


September 15, 2023
1. work on node "Heart Disease" so that it collapses without re-arranging the graph.
2. Paths should disappear. Layer should maintain arrangement, but recover space. 
3. Core issue - Stopping re-arrangement, but recover space in affected layers.

Oct 6, 2023
1. Moving towards controlling data collapse/fetch from our own data module
   instead of operating on the d3-dag data structure
2. Talking through data and display ideas
3. For multiple concept sets, show the list, and when you hover over
   a node, highlight the concept sets that contain it.
4. Have check boxes for each concept set and highlight all the nodes that
   are contained by all the ones checked (partial highlight if not all
   descendants are contained.)
5. If a node has x (10?) or more children, try to keep it collapsed, but allow
   user to see what's in it: 1) by size/color; 2) with a list that appears on
   hover or click;
6. Showing a lot with each node: 
   - number of children
   - whether all or some children/descendants belong to concept sets
   - how deep it goes
   - easy access to names of children
7. What about multiple relationship types? Mapping, body site, causes, etc.
   - Could show collapsed nodes as children, one for each relationship type
8. If user has a lot of nodes displayed (and many more in memory), and tries
   to expand something big: prompt them to collapse something else?
   - Maybe it's temporary message for a few seconds: "You're displaying a lot of
     nodes. The application may become slow. Do you want to collapse something else?"
   - Or message, how many nodes in memory and displayed.
   - And how many descendants/levels
9. Server should provide number of descendants/levels for nodes first
   and then provide the actual nodes for them either on demand or, if
   resources available, on prefetch
10.Slider for the user to balance between performance and data density
