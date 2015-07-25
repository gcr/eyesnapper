// precision mediump float;
// #define PI 3.1415926535897932384626433832795

// uniform float u_time;
// uniform vec2 u_k;
// varying vec2 v_coords;

// void main() {
//   float v = 0.0;
//   vec2 c = v_coords * u_k - u_k/2.0;
//   v += sin((c.x+u_time));
//   v += sin((c.y+u_time)/2.0);
//   v += sin((c.x+c.y+u_time)/2.0);
//   c += u_k/2.0 * vec2(sin(u_time/3.0), cos(u_time/2.0));
//   v += sin(sqrt(c.x*c.x+c.y*c.y+1.0)+u_time);
//   v = v/2.0;
//   vec3 col = vec3(1, sin(PI*v), cos(PI*v));
//   gl_FragColor = vec4(col*.5 + .5, 1);
// }

/**
 * HTML5 Canvas Plasma (fillRect technique)
 *
 * Kevin Roast 10/8/11
 */

var RAD = Math.PI/180.0;
var Sin = Math.sin;
var Cos = Math.cos;
var Sqrt = Math.sqrt;

var HEIGHT;
var WIDTH;
var g_plasma;
var g_canvas;
var g_framestart;

var g_data;
var g_ctx;

window.addEventListener('load', onloadHandler, false);
window.addEventListener('resize', resizeHandler, false);

/**
 * Global window onload handler
 */
function onloadHandler()
{
  // fullscreen the canvas element
  g_canvas = document.getElementById('c');
  WIDTH = g_canvas.width = window.innerWidth;
  HEIGHT = g_canvas.height = window.innerHeight;
  g_ctx = g_canvas.getContext('2d');
  g_data = g_ctx.createImageData(320,200);

  g_framestart = Date.now();
  requestAnimFrame(loop);
}

/**
 * Global window resize handler
 */
function resizeHandler()
{
  if (g_canvas)
  {
    WIDTH = g_canvas.width = window.innerWidth;
    HEIGHT = g_canvas.height = window.innerHeight;
  }
}

/**
 * Main render loop
 */
function loop()
{
  var i=0;
  var data = g_data.data;
  for (xx=0; xx<320; xx++) {
    for (yy=0; yy<240; yy++) {
      var x = xx/320;
      var y = yy/240;
      var idx = 4 * (y*320 + x);
      data[idx] = 128;
      data[idx+1] = 128;
      data[idx+2] = 128;
      data[idx+3] = 128;
    }
  }
  g_ctx.putImageData(g_data, 0,0);


  // // init context and img data buffer
  // var PlasmaDensity = 8.0;
  // var w = WIDTH, h = HEIGHT,
  //     pw = PlasmaDensity, ph = (pw * (h/w)),
  //     ctx = g_canvas.getContext('2d');
  // // scale the plasma source to the canvas width/height
  // var vpx = (w/pw), vpy = (h/ph);

  // var dist = function dist(a, b, c, d)
  // {
  //   return Sqrt((a - c) * (a - c) + (b - d) * (b - d));
  // }

  // var time = Date.now() / this.TimeFunction;

  // ctx.save();
  // ctx.globalAlpha = 0.8
  // var jitter_offset = 3;
  // var jitter = jitter_offset ? (-jitter_offset + (Math.random()*jitter_offset*2)) : 0;
  // for (var y=0,x; y<ph; y++)
  // {
  //   for (x=0; x<pw; x++)
  //   {
  //     // map plasma pixels to canvas pixels using the virtual pixel size
  //     ctx.fillStyle = rgb(255*x / pw, y / ph, 128);
  //     ctx.fillRect(x * vpx + jitter, y * vpy + jitter, vpx, vpy);
  //   }
  // }
  // ctx.restore();
  requestAnimFrame(loop);
}



window.requestAnimFrame = (function()
                           {
                             return  window.requestAnimationFrame       ||
                               window.webkitRequestAnimationFrame ||
                               window.mozRequestAnimationFrame    ||
                               window.oRequestAnimationFrame      ||
                               window.msRequestAnimationFrame     ||
                               function(callback, element)
                             {
                               window.setTimeout(callback, 1000 / 60);
                             };
                           })();