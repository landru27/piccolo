# piccolo
piccolo : /ˈpɪkəloʊ/ : ![](https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Speaker_Icon.svg/16px-Speaker_Icon.svg.png) [audio](https://www.vocabolaudio.com/it/piccolo) : small, little; as in "piccolo mondo" (little world), or "[Piccolo Teatro di Milano](https://en.wikipedia.org/wiki/Piccolo_Teatro_(Milan))"

## motivation
[piccolo](https://github.com/landru27/piccolo) is a 3D 6DoF engine for modeling a small world.  I intend to use piccolo as the display engine for projects of my own, and I humbly offer it to the world as a starting point for others' projects.

My first project will be an interactive environment where people can learn to program.  I also have a long-running desire to create the kind of exploration and survival game that I would enjoy playing.  And, I hope to use piccolo as a visualization tool.

In addition to such practical uses, software is a medium for art.  This is as true for visualizations such as producing an image of [the Mandelbrot set](https://en.wikipedia.org/wiki/Mandelbrot_set), as it is for visualizations of complex, emergent phenomena such as [Craig Reynolds' boids](http://www.red3d.com/cwr/boids/), as it is for art created with software tools and/or as [digital works](https://codepen.io/louflan/full/JjGVbjY), such as CG landscapes, 3D models and soundscapes, or interactive [instruments](https://www.google.com/logos/doodles/2017/fischinger/fischinger17.9.html?hl=en) or [novels](https://en.wikipedia.org/wiki/Life_Is_Strange).

Thus, my motivation is to provide myself and, perhaps, the wider world, a way to produce a wide variety of practical and creative works which call for 3D display.

## community
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)

Contributions are welcome!  I am currently adding core features.  I have some specific plans for implementing these features, and I hope to proceed rapidly.  Still, I welcome contributions.  Bugfixes are always welcome, as are optimizations.  I am also eager to see in what directions others take this work.  If you do fork this project and improve it, please consider contributing those improvements as PRs back to this project as well.

Models, textures, sound effects, music, and other assets for a demonstrator application would also be welcome.  A demo project will be necessary to show how to use `piccolo`, and as a springboard for others to start their own projects.

Financial contributions would also be welcome, and I am considering setting up a Patreon page when this project is a bit more mature.

All contributions would become part of the `piccolo` project, licensed under [MPLv2](../main/LICENSE).

Please be aware that this project and the community who craft it and who sustain it abide by a [code of conduct](../main/CODE_OF_CONDUCT.md), and that contributors follow a [set of conventions for contributions](../main/CONTRIBUTING.md), including through each contribution affirmation of a [Developer Certificate of Origin](../main/DCO.md).

## credits
This work has benefited from the work of others from whom I [learned and drew inspiration](../main/CREDITS.md).

## timeline
* **the Before Time** : lots of small projects, a great many failures, some successes; in other words, learning
* **November, 2020** : starting out

## installation
See the [installation notes](../main/INSTALL.md).

## dependencies
This project makes use of the following principle libraries:

* [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)
* [three.js](https://threejs.org/)
* [ecsy](https://ecsy.io/)
* [eslint](https://eslint.org/)
* [jest](https://jestjs.io/)
* [snowpack](https://www.snowpack.dev/)
* [webpack](https://webpack.js.org/)

This project has these external dependencies:

* [JavaScript](https://en.wikipedia.org/wiki/JavaScript); "JavaScript" is a [trademark](http://tarr.uspto.gov/servlet/tarr?regser=serial&entry=75026640) of Oracle Corporation in the United States.

## license
This project is published under the [Mozilla Public License Version 2.0 - MPLv2](../main/LICENSE).

Portions are published by their authors under the [MIT License](https://opensource.org/licenses/MIT).  Such portions are noted as such in the source code, per the MIT licence.

A number of libraries used by this project are installed from public sources by `npm` during installation of `piccolo`, and thus are not redistributed as part of this project, but nevertheless contribute in important ways to the functionality of this project.

The favicon and basic icosahedron image in the demonstrator sites are adapted from the icosahedron SVG on [the icosahedron Wikipedia page](https://en.wikipedia.org/wiki/Icosahedron), which is &copy; [User:DTR](https://commons.wikimedia.org/wiki/User:DTR) / [Wikimedia Commons](https://commons.wikimedia.org/) / [CC-BY-SA-3.0](https://creativecommons.org/licenses/by-sa/3.0/deed.en)
