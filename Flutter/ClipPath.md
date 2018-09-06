## ClipPath

```Javascript
ClipPath(
	clipper: new ArcClipper(),
	child: Stack(
	children: <Widget>[
        new Container(
        	decoration: new BoxDecoration(	
        		gradient: new LinearGradient(
                	colors: UIData.kitGradients,
              	)
	     ),
         ),
         showIcon ? new Center(
             child: SizedBox(
             	height: deviceSize.height / 8,
                width: deviceSize.width / 2,
                child: FlutterLogo(
                	colors: Colors.yellow,
                 )),
             ) : new Container( 
	     		width: double.infinity, 
                	child: image != null ? Image.network( image, fit: BoxFit.cover,):new Container())
          ],
        ),
      ),
```



```javascript
class ArcClipper extends CustomClipper<Path> {
  @override
  Path getClip(Size size) {
    var path = new Path();
    path.lineTo(0.0, size.height - 30);

    var firstControlPoint = new Offset(size.width / 4, size.height);
    var firstPoint = new Offset(size.width/2 , size.height);
    path.quadraticBezierTo(firstControlPoint.dx, firstControlPoint.dy,
        firstPoint.dx, firstPoint.dy);
    var secondControlPoint = new Offset(size.width - (size.width / 4), size.height);
    var secondPoint = new Offset(size.width, size.height - 30);

    path.quadraticBezierTo(secondControlPoint.dx, secondControlPoint.dy,
        secondPoint.dx, secondPoint.dy);

    path.lineTo(size.width, 0.0);
    path.close();

    return path;
  }

  @override
  bool shouldReclip(CustomClipper<Path> oldClipper) => false;
}

```

显示出来的效果会是这样的, 有一条弧度

<img src = "https://github.com/hptg1994/JSKnowledgeCollection/blob/master/Flutter/resource/ClipPathImg.png"  height = "400px" />

### 原理
先lineTo curve的起点（左下角），通过两个offset，第一个为经过的点（屏幕中间偏左），第二个为到达的点（屏幕中间），然后通过quadraticBezierTo（到达的x，到达的y，经过的x，经过的y），就把原点和屏幕中间那一点的连线curved了，现在原点会到达屏幕中间，继续干之前的事（中间和右边的点之间curved），大功告成
