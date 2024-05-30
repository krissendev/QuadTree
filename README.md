<img alt="A red cube pushes a grey cube off screen" width="100%" height="100%" src="https://github.com/krissendev/QuadTree/blob/master/styles/banner.png">

<h1 align="center">QuadTree</h1> 
This is a quadtree based 2D physics system that uses html and javascript with svg elements to achieve collision detection and correction.

<br>

The video below demonstrates how QuadTree works, if you want to try out QuadTree for yourself simply follow the [Quickstart](#quickstart) or for a brief summary of the codebase refer to [Explanation](#explanation).
QuadTree is functional but has still room for general improvements and further feature implementation for example: Three diffing, three balancing etc.
<br><br>


https://github.com/krissendev/QuadTree/assets/43881249/555597bf-366f-44a0-ba12-1936e3b41908

<br>

## Quickstart
<br>

### #1 clone this repository
```
git clone https://github.com/krissendev/QuadTree
```
<br>

### #2 open project folder
```
cd QuadTree   #enter into the folder/dir 
```
<br>

### #3 run localhost server
* either by running "liveserver(Five Server)" plugin in vscode
  <br>
* with node.js installed,  install package:"npm install -g http-server" then run: "http-server"
  <br>
* or some other form of local server environment
<br><br>
## Explanation
The general codeflow is currently
<br> <pre>
* painting svg points: index.html -> index.js -> /visualization/addCircle.js
* generating quadTree: index.html -> index.js -> /quadTree/addQuadTree.js
  //𝑤ℎ𝑖𝑐ℎ 𝑢𝑠𝑒𝑠 𝑟𝑒𝑠𝑜𝑢𝑟𝑐𝑒𝑠 𝑓𝑟𝑜𝑚 '/𝑞𝑢𝑎𝑑𝑇𝑟𝑒𝑒'
* drawing rectangles:  index.html -> index.js -> /visualization/addRect.js
  //𝑜𝑛𝑙𝑦 𝑓𝑜𝑟 𝑑𝑒𝑏𝑢𝑔𝑔𝑖𝑛𝑔 𝑣𝑖𝑠𝑢𝑎𝑙𝑖𝑧𝑎𝑡𝑖𝑜𝑛 𝑝𝑢𝑟𝑝𝑜𝑠𝑒𝑠
* collision checking:  index.html -> index.js -> /physics/physics.js
  //𝘸𝘩𝘪𝘤𝘩 𝘶𝘴𝘦𝘴 𝘳𝘦𝘴𝘰𝘶𝘳𝘤𝘦𝘴 𝘧𝘳𝘰𝘮 '/𝘱𝘩𝘺𝘴𝘪𝘤𝘴' 𝘢𝘴𝘸𝘦𝘭𝘭 𝘢𝘴 𝘸𝘪𝘯𝘥𝘰𝘸 𝘣𝘰𝘶𝘯𝘥 '𝘴𝘷𝘨𝘘𝘶𝘢𝘥𝘛𝘳𝘦𝘦' 𝘢𝘯𝘥 '𝘘𝘶𝘢𝘥𝘛𝘳𝘦𝘦' 𝘰𝘣𝘫𝘦𝘤𝘵𝘴 𝘧𝘳𝘰𝘮 '/𝘲𝘶𝘢𝘥𝘛𝘳𝘦𝘦/addQuadTree.js'
</pre>
