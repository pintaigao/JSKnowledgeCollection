# Planets-Flutter: creating a Planet card

In the [previous article](https://sergiandreplace.com/2017/09/planets-flutter-from-design-to-app/) we saw how to create a custom App bar without using the class `Appbar` in order to make easier to get a gradient background and a centered title.

Next step is to create the Widget that we will use to create the list of planets. Today we will work on a hard-coded item, to be able to transform it into a list of elements in the future.

## Job description

Here is the card we want to build today:

![planet card](https://sergiandreplace.com/img/planets-card-sample.png)

### Measures and densities

The original design is a psd file, and the screen measures 1080 x 1800. If we check at [Device Metrics website](https://material.io/devices/) we can see that mobile devices with 1080 x 1920 (our screen size plus status bar more or less) have mostly a density of 3.0 and some 2.6. So for the sake of simplicity, we will use 3 as our density factor. That means that we will divide all measures by 3 to transform from pixels to dp.

You can see all sizes for the card margins in this image:

![planet card with measures](https://sergiandreplace.com/img/planets-card-measure.png)

Top and left figures are measures in pixels, and bottom and right ones are measures in dp.

So, let’s go back to our last code and work from there. In the `HomePage` class, we add a new element to the `Column` in the `Scaffold` body:

```dart
 1import 'package:flutter/material.dart';
 2import 'package:planets/ui/home/GradientAppBar.dart';
 3import 'package:planets/ui/home/HomePageBody.dart';
 4
 5class HomePage extends StatelessWidget {
 6
 7  @override
 8  Widget build(BuildContext context) {
 9    return new Scaffold(
10      body: new Column(
11        children: <Widget>[
12          new GradientAppBar("treva"),
13          new HomePageBody(),
14        ],
15      ),
16    );
17  }
18}
```

As you may see, we added a new import to a file named HomePageBody.dart, instantiated a new HomePageBody object and added it to the `Column` children.

Create the file HomePageBody.dart and let’s go for it with a basic structure:

```dart
1import 'package:flutter/material.dart';
2import 'package:planets/ui/home/PlanetRow.dart';
3
4class HomePageBody extends StatelessWidget {
5  @override
6  Widget build(BuildContext context) {
7    return new PlanetRow();
8  }
9}
```

Again, we are just placing an element of type PlanetRow and importing the file PlanetRow.dart. Now we can create it with a simple base:

```dart
1import 'package:flutter/material.dart';
2
3class PlanetRow extends StatelessWidget {
4  @override
5  Widget build(BuildContext context) {
6    return new Container();
7  }
8}
```

Starting to see the pattern?

## Borders

We will set the margins for the container following what design indicate, 24 dp for left and right, and 16dp for top and bottom. Keep in mind that the separation between cells is 32 dp, but as we will pile them, we need to share this separation between the bottom border of each card and the top border of the next on to add up to 32 dp.

This will left us with a minor top margin for first item and bottom margin for last one. We’ll see how to fix this when creating the list.

We can do it in this way:

```dart
 1class PlanetRow extends StatelessWidget {
 2  @override
 3  Widget build(BuildContext context) {
 4    return new Container(
 5      margin: const EdgeInsets.only(
 6        top: 16.0,
 7        bottom: 16.0, 
 8        left: 24.0,
 9        right: 24.0,
10      )
11    );
12  }
13}
```

EdgeInsets is a class that will generate the appropiate margins. It has some fancy constructors:

- `EdgeInsets.only(left, top, right, bottom)`: allows us to define different margins per side. All them are optional, so you can specify, for example, only left and top.
- `EdgeInsets.fromLTRB(left, top, right, bottom)`: similar to previous, but, you have to specify the four margins with positional parameters. The LTRB is a nmemonic rule (Left, Top, Right, Bottom).
- `EdgeInsets.all(value)`: sets the same margin for all four sides.
- `EdgeInsets.symmetric(vertical, horizontal)`: allows us to specify top/bottom and/or left/right with a single value.

As you can see, in this case our margins are symmetrical, so we can change it to:

```dart
 1class PlanetRow extends StatelessWidget {
 2  @override
 3  Widget build(BuildContext context) {
 4    return new Container(
 5      margin: const EdgeInsets.symmetric(
 6        vertical: 16.0,
 7        horizontal: 24.0,
 8      )
 9    );
10  }
11}
```

Much cleaner and concise. And now, for the content.

## Setting up the row

The row consists of two objects, the planet image and a blue rectangle with the text. As the planet overlaps the rectangle, the best way to organize them is to put them in a `Stack`widget. The `Stack` widget just puts elements one in top of the other in the z-axis.

```dart
 1class PlanetRow extends StatelessWidget {
 2    @override
 3  Widget build(BuildContext context) {
 4    return new Container(
 5      height: 120.0,
 6      margin: const EdgeInsets.symmetric(
 7        vertical: 16.0,
 8        horizontal: 24.0,
 9      ),
10      child: new Stack(
11        children: <Widget>[
12          planetCard,
13          planetThumbnail,
14        ],
15      )
16    );
17  }
18}
```

We will define what planetCard and planetThumbnail are in a moment. Notice that, as the card goes behind the thumbnail, it should be declared first.

## The planet thumbnail

The `planetThumbnail`is just a simple image. We will put it in assets/img folder and declare it in the pubspec.yaml:

```yaml
  assets:
    - assets/img/mars.png
```

You can get the file from [here](https://raw.githubusercontent.com/sergiandreplace/planets-flutter/master/assets/img/mars.png).

Now we can declare it using the sizes and margins from the design.

```dart
 1  final planetThumbnail = new Container(
 2    margin: new EdgeInsets.symmetric(
 3      vertical: 16.0
 4    ),
 5    alignment: FractionalOffset.centerLeft,
 6    child: new Image(
 7      image: new AssetImage("assets/img/mars.png"),
 8      height: 92.0,
 9      width: 92.0,
10    ),
11  );
```

Let’s review it. We have a `Container` with an `Image` as single child. We set a vertical margin of 16dp, and align the content to the left. Otherwise, the container will wrap to the content, and due to inheritance, it will use the minimum size possible (it will be probably corrected by the card, but.. why to risk).

The `Image` class needs a Provider to serve the image itself. As our image is a declared asset, we use AssetImage with the path to our image.

Finally, we set the size of the image as per design.

## A decorated card

And now, the card:

```dart
 1  final planetCard = new Container(
 2    height: 124.0,
 3    margin: new EdgeInsets.only(left: 46.0),
 4    decoration: new BoxDecoration(
 5      color: new Color(0xFF333366),
 6      shape: BoxShape.rectangle,
 7      borderRadius: new BorderRadius.circular(8.0),
 8      boxShadow: <BoxShadow>[
 9        new BoxShadow(  
10          color: Colors.black12,
11          blurRadius: 10.0,
12          offset: new Offset(0.0, 10.0),
13        ),
14      ],
15    ),
16  );
```

- We have a Container of height 124 as per design.
- It has an additional margin of 46dp (half planet)
- It has several decorations:
  - A background color (taken from design)
  - A rectangle shape
  - A border radius of 8dp (24px in Photoshop)
  - And a shadow. 

This is a screenshot of the definition of the shadow on Photoshop:

![Photoshop setup](https://sergiandreplace.com/img/planet-card-photoshop-shadow.png)

We translate the size as blurRadius (29 / 3 = 10ish), and the distance and angle as offset, so, 10dp at 90º is the same than 10.0 down in the y axis (so 0.0, 10.0).

And that should give you a nice card like this:

![Nice cards](https://sergiandreplace.com/img/planet-standalone-card.png)

If you want to have more than one card as in the screenshot, just add more instance of `HomePageBody` in the children list of the Column in `HombePage` class:

```dart
 1class HomePage extends StatelessWidget {
 2
 3  @override
 4  Widget build(BuildContext context) {
 5    return new Scaffold(
 6      body: new Column(
 7        children: <Widget>[
 8          new GradientAppBar("treva"),
 9          new HomePageBody(),
10          new HomePageBody(),
11          new HomePageBody(),
12          new HomePageBody(),
13        ],
14      ),
15    );
16  }
17}
```

## To be continued…

Enough for today. We learned a lot of things:

- How to use measures from design. If you use a bitmap based tool like Photoshop, just pickup your density and divide measures by the density (**Pro trick**: Designers are people, talk to them, achieve agreements in thinks like the size they use and what density are they emulating. They don’t bite, well, some of them at least).
- How to define margins in different ways, Dart multiple named constructors are made to bring joy to the world.
- How to use an image from an asset
- Doing decorations to get colors, borders, rounded corners, shadows. Play with it, explore, it’s cool.
- How to translate a shadow from Photoshop to Flutter.

Next steps are bringing content to the planet card and make a list of it, and from that, to the detail. Stay tuned!