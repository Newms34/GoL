# Conway's Game of Life (in JavaScript)
##Description:
This is an exercise for a local MEAN-stack meetup group. It's originally forked from [Fullstack Academy](https://github.com/FullstackAcademy), so they deserve all the credit. Note that while this simulation is done with a prototypical inheritance model, there are [many](http://jsfiddle.net/tchatel/H2y5r/) [other](http://damiankao.github.io/life/) [ways](http://disruptive-communications.com/conwaylifejavascript/) to do this!


##About Conway's Game of Life
Conway's Game of Life is a cellular automation that can produce some really cool effects. Basically, you've got a grid of cells, where each cell can either be 'alive' or 'dead' (or be 'born' or 'die'). The status of each cell is determined by how many neighbors it has:

 - Cells with 2 or fewer neighbors die, as if by loneliness. Sad.
 - Cells with 2 or 3 neighbors live (if already alive).
 - Cells with 4 or more neighbors die (if currently alive), because overpopulation sucks.
 - Cells with exactly 3 neighbors, if currently dead, are 'born'.

This cycle basically repeats for as long as you run the simulation.

##Credits:
- I owe most of this to the brilliant folks over at [Fullstack Academy](https://github.com/FullstackAcademy).
- A few small changes (mostly, deleting stuff) were done by me, [David Newman](https://github.com/Newms34)
