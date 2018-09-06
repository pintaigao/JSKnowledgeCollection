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
                	child: image != null ? Image.network( image, fit: BoxFit.cover,):
					new Container())
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

    print(firstControlPoint.dx);
    print(firstControlPoint.dy);
    print(firstPoint.dx);
    print(firstPoint.dy);
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

显示出来的效果会是这样的

<center>![/resource/ClipPathImg.png]</center>

