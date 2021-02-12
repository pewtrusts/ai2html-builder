# ai2html builder
The ai2html builder allows designers to immediately see how an Adobe Illustrator asset will look on Pew's website, on multiple screen sizes, after being run through ai2html.

[ai2html](ai2html.org) is a script, originally created by the New York Times,  that separates the text from the art of Illustrator files. The text is converted to HTML positioned over background images. This allows the text to stay the same size as the artwork below is scaled up or down. ai2html can output multiple artboards, of different sizes, in one package so that different versions are displayed at different breakpoints.

## How to set up this tool
The ai2html builder is basically a package of files and Node.js scripts that compile the files into webpages. The tool launches a webserver locally on your machine that displays the webpage. When a file changes, the page automatically reloads to show the changes. To work, you will set up ai2html to place its output files into this package so that when you create or edit ai2html outputs they are automatically displayed on a replica of Pew's website. You can also navigate to another page that shows the content in multiple viewports at the same time.

This tool as several dependencies that designers will need to install on their machines:
3. git
1. Node.js
2. npm
4. ai2html

### Git
Git is version control system for software development. For present purposes, its use is limited to cloning this tool's Github repository onto the designer's machine. It's also a dependency of the next step.

First, check to see is git is already installed on your machine. In your terminal, type `git --version`. If it is installed, you will be shown the version you have. If it is not installed, you should be prompted to install it. Follow those instructions if so.

### Node and npm
Node is Javascript runtime environment for your machine; npm is a package manager that simplifies installing and managing modules. The best way to install Node and npm is with nvm (Node version manager). First, check to see if it is already installed:

type `nvm --version`

If it is already installed you will see the version number and you can skip to the "install node" section below. If not, install nvm first.

#### Install nvm

The installation will attempt to add some lines to your terminal profile file and therefore needs a that file to be present. You may or may not already have one. The process is different depending on which OSX version you're on.

**For MacOSX 10.14 (High Sierra) or earlier**

Enter into the terminal:

`touch ~/.bash_profile`

If the file exists, it will do nothing; if it does not, the blank file will be created.

**For MacOSX 10.15 (Catalina) or later**

Enter into the terminal:

`touch ~/.zshrc`

If the file exists, it will do nothing; if it does not, the blank file will be created.

Now you should be able to install Node and npm.  Follow the [installation directions](https://github.com/nvm-sh/nvm#install--update-script) on its Github page. Copy-pasting the `curl` command will be easiest.

The installation depends on git being installed on your machine, which we did in step 1. If you get a pop-up asking you to install command line developer tools, follow those instructions to do so.

After the `curl` command completes, close and reopen your terminal for the changes to take effect and then confirm that nvm is present:

`nvm --version`

If it is not working, try some of the troubleshooting steps at in the [installation directions](https://github.com/nvm-sh/nvm#install--update-script).

#### Install node

After nvm is installed, run the command `nvm install 14.15.4`. This will install Node and npm.


### ai2html
As mentioned above, ai2html is the script for Adobe Illustrator that separates the text from artwork and allows for outputting multiple artboards for different breakpoints.

Read more about ai2html and how to install it at the [ai2html website](http://ai2html.org/), **but use this link to [download the script](https://raw.githubusercontent.com/jostermanAtPEW/ai2html/master/ai2html.js)** rather than the one provided there. This version has changes that places text more accurately when it is scaled down; the original script does not anticipate text changing size dynamically. It also provides custom options described more fully below.

To install the script, you need to place in this folder (your version of Illustrator might be different; if you have multiple versions installed, be sure place the script in the directory for the version you use):

`/Applications/Adobe Illustrator CC 2020/Presets/en_US/Scripts/`

### Installing this tool
Once all the above software is installed, you're ready to install this tool. You may install it anywhere; the instructions below install in in your home directory.

Open you terminal and navigate to your home directory:

```bash
cd ~
```

Then clone this repository using Git. It will be downloaded into `~/ai2html-builder/`. If you get a warning that the "authenticity of host 'github.com' can't be established," go ahead and enter "yes."

```bash
git clone https://github.com/pewtrusts/ai2html-builder.git
```

The tool uses code shared with other Pew tools and that needs to be installed as a submodule. First enter into the directory:

```bash
cd ai2html-builder
```
then:
```bash
git submodule init
```

and then:

```bash
git submodule update
```

Then run `npm install` to install the tool's dependencies.

```bash
npm install
```

## How to start the tool 
Using this tool is relatively easy; the harder part is understanding the effects ai2html will have on the assets you create. Perhaps harder still is creating for a fluid-width environment, preferably with a mobile-first approach. More on that below.

To use this tool, `cd` into its directory if you are not already there and run the command to compile the files into a webpage and start a webserver on your machine:

```bash
npm run dev
```

Open an up-to-date browser (Chrome or Firefox) and navigate to 127.0.0.1:8080. You should see the example asset:

![example ai2html asset in webpage](example.png)

### Multiple viewports
To see how an asset will look on multiple screen sizes, navigate your browser to 127.0.0.1:8080/viewports/. On this page, you will be able to immediately see how any changes you make to an asset will show up on different devices.

![example ai2html asset in multiple viewports](example-viewports.png)

### Different column widths
The main content of a standard Pew webpage will either be in a 70-percent-width column or 100-percent-width column. Most pages use the 70 percent, and that is the default for this tool. To see your assets in a 100-percent-width column, navigate to 127.0.0.1:8080/full.

This will place the asset in a full-width column:

![example ai2html asset in full-width column](example-full.png)

## Multiple artboards per asset in Adobe Illustrator

The builder relies on a specific artboard naming convention to work. Multiple artboards are necessary to account for the large size difference that the assets need to accommodate. Not all artboards are required: most projects will use *mobile* and *print*. Which artboards you need depends on the column you're designing for—70 percent or 100-percent—and whether you have a print asset as a starting point or not.

### For 70-percent-width columns

Most of our web content is in a 70-percent-width column. If you have a 6.5in print asset already, we can use that artboard to set how the asset will be displayed at 650px, when the viewport is 686px wide or wider. The artboard should be, or will already be, set to 468px, which is equivalent to 6.5in. The artboard must be named *print*.

The default settings will essentially bypass the conversion to html and output the print artboard as-is as an SVG file for display on the website. The text sizes will remain proportional to the design: 9pt text will display at 12.5px. There are options, discussed below, to force the print artboard to convert to html and to change the its image format from SVG to .jpg or .png. Native text size under 9pt should be avoided. In most cases, the *print* artboard will only be displayed at exactly 650px the scaling up and down inherent to SVG will not be an issue.

In most case you will want to supply an artboard named *mobile* to handle smaller screen sizes. The *mobile* artboard sets how the asset will be displayed at any size less than 650px (when the viewport in less than 686px wide). This artboard should be set to 366px wide, which is in the ballpark for many mobile devices, and **all text should be set to 12.5px**. On the website, after being run through ai2html, the smaller asset will look exactly as designed only when it is that exact width (a viewport of 416px, accounting for padding on the sides of the column). At smaller sizes, all elements of the asset, including text, will scale down, but the proportions and spacing will be constant. The text will scale down to a minimum of 10px. At sizes greater than 366 but less than 650px, the art of the asset will scale up but the text size will not. Text, relative to the size of the asset, will *appear* smaller and the space between text will grow.

If you provide only the *mobile* artboard, it will display at all sizes for 70-percent-width destinations. At larger sizes the text will appear smaller, relative to the artwork, and it will be spaced out.

If you provide only the *print* artboard, it will display at all sizes for 70-percent-width destinations. At smaller sizes, the text will scale down with the artwork and potentially become illegible. There may be cases, though, where a single artboard is sufficient, depending on the nature of the asset.

**At minimum, we must supply either *mobile* or *print* artboards. The other sizes, discussed below, will not display at sizes less than 650px.**

### For 100-percent-width columns

There are several artboard combinations possible for 100-percent-width destinations.

If you supply only *mobile* and *print*, the behavior on the site will be as described above--*mobile* for sizes less than 650px and print for 650px. The asset will not scale above 650px even as the column containing it does.

If you supply only *mobile*, it will display at all screen sizes but will not scale above 650px even as the column containing it does.

If you supply only *print*, it will display all sizes but will not scale up above 650px. Its text will shrink and become illegible on smaller screen sizes.

Again, we must at minimum supply *mobile* or *print*. Larger sizes are available for renderings above 650px.

In order for the asset to scale up above 650px, you will in most cases want to supply two additional artboards, one called *medium* and another called *full*. When both are supplied, the *medium* artboard sets how the asset will display at sizes greater than or equal to 650px but less than 990px; *full* sets how it will display at exactly 990px;

The *medium* artboard should be set to 650px wide and all text should be set to 12.5px. As the asset scales up, text will remain the same size (appear smaller, relative to the artwork) and spread out.

The *full* artboard should be set to 713px and have its text set to 9pt. This artboard will by default be displayed as an SVG image so that, when scaled up to 990px, the text will be 12.5px.

If the only additional artboard supplied is *medium*, it will display at any size 650px or greater. At 990px its text will appear small relative to the artwork and be spaced out.

If the only additional artboard supplied is *full*, it will display only at 990px. Between 650 and 990px, the artwork will come from the *print* artboard if it is available or *mobile* if it not, capped at a 650px max width.

### Hed, dek, source, and notes
The hed, dek, source, and notes can be set in the ai2html-settings text block. The builder tool will supply them, as html, in the code to include in the website. This way, the text is exposes to search engines and screen readers, is crisply rendered, and can include links.

The builder's ai2html script is actually creating two files for each assets, one named &lt;name&gt;.preview.html and the other just &lt;name&gt;.html. The *preview* version includes the hed, dek, source, and notes and is automatically shown as the tool's output. You may use the code in the non*preview* version if that suits current purposes better.

### Other settings
The ai2html-settings text block can take other settings to change how the script handles the conversion process. A full list of standard options is available at [ai2html.org](ai2html.org). The descriptions below touch on some them and describe the custom options provided through this tool only.

* `image_format`: can be `auto`, `svg` (default), `png`, or `jpg`. This sets the image format for the background image for assets sizes that are converted to html. The builder tool defaults to `svg` in anticipation that most of the assets will be graphs or illustrations for which SVG will be sufficiently small. Choose `jpg` if the background is a raster image with photorealistic color, `png` if colors are more limited. `auto` allows the ai2html script to choose by its own criteria (image type and size). the *print* and *full* artboards are alway converted to an SVG regardless of this setting unless it is overridden with `override_static_svg`.
* `override_static_svg`: `true` or `false` (default). The *print* and *full* artboards are alway converted to an SVG unless this is set to `true`. 
* `override_auto_static`: `true` or `false` (default). The *print* and *full* artboards are always converted to an image, not html, unless that is overridden by setting this to `true`. When set to `true`, the *print* and *full* artboards will undergo the same ai2html conversion that the *mobile* and *medium* artboards go through.
* `preserve_print_text_sizes`: `true` or `false` (default). This only has an effect if `override_auto_static` is `true`. By default, the text in a *print* or *full* artboard that undergoes the ai2html conversion will inherit the text size set in Illustrator. In most cases, that text size (often 9pt) will be too small for screen use. In addition, the asset will scale to fit its container while the text will not scale. Setting this to `true` multiplies the text size settings by the right factor to keep the text size proportional to the original design. <br/><br/>**Use case**: say you have a print asset designed on a 6.5in artboard that you want use as a 650px wide asset on the website. Normally you could allow the automatic conversion of the *print* artboard to convert in to an SVG, and that would fill the the container just fine. But if this asset has a raster background or really complex (and big) SVG, you will not want that default behavior, and you also may not want to convert the whole thing to a raster image because of the lossy resolution on the text. Setting `override_auto_static`, `override_static_svg`, and `preserve_print_text_sizes` to `true` will send the asset through the ai2html conversion: the background will be a raster image with html text floating on top. The difference between  this apporach and the default procedure for *mobile* nd *medium* artboards is that the text sizes remain in proportion to the original design, whereas *mobile* and *print* artboards must have all text set to 12.5px.