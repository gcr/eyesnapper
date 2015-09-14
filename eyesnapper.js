// Generated by LiveScript 1.4.0
(function(){
  var showText, showControls, startSession, showWordListForm, out$ = typeof exports != 'undefined' && exports || this;
  out$.showText = showText = function(arg$){
    var text, location, font, ref$, possibleLocations, locationCss, x$, element;
    text = arg$.text, location = arg$.location, font = (ref$ = arg$.font) != null ? ref$ : "15%";
    possibleLocations = [
      [
        {
          top: "1em",
          left: "1em"
        }, {
          top: "50%",
          left: "1em",
          marginTop: "-0.5em"
        }, {
          bottom: "1em",
          left: "1em"
        }
      ], [
        {
          top: "1em",
          right: "1em"
        }, {
          top: "50%",
          right: "1em",
          marginTop: "-0.5em"
        }, {
          bottom: "1em",
          right: "1em"
        }
      ]
    ][location];
    locationCss = possibleLocations[Math.floor(Math.random() * possibleLocations.length)];
    x$ = element = $("<div>");
    x$.text(text);
    x$.addClass('eyesnapper-text-label');
    x$.css(import$(locationCss, {
      display: "block",
      position: "fixed",
      font: font
    }));
    return element.appendTo(document.body);
  };
  out$.showControls = showControls = function(bpm, setBpm, end){
    var refreshControls, x$, endButton, genButton, y$, container;
    refreshControls = function(button){
      $(".bpm-button").removeClass("active");
      if (button) {
        return $(button).addClass("active");
      }
    };
    x$ = endButton = $("<button>");
    x$.addClass("control-button");
    x$.text("End");
    x$.click(function(){
      return end();
    });
    genButton = function(b){
      var x$;
      x$ = $("<button>");
      x$.text(b + "");
      x$.addClass("control-button");
      x$.addClass("bpm-button");
      if (bpm === b) {
        x$.addClass("active");
      }
      x$.click(function(){
        setBpm(b);
        return refreshControls(this);
      });
      return x$;
    };
    y$ = container = $("<div>");
    y$.append(endButton);
    y$.append(genButton(10));
    y$.append(genButton(15));
    y$.append(genButton(20));
    y$.append(genButton(25));
    y$.append(genButton(30));
    y$.append(genButton(35));
    y$.append(genButton(40));
    y$.append(genButton(45));
    y$.append(genButton(50));
    y$.append(genButton(55));
    y$.append(genButton(60));
    y$.append(genButton(65));
    y$.append(genButton(70));
    y$.append(genButton(75));
    y$.append(genButton(80));
    y$.appendTo(document.body);
    y$.css({
      position: 'fixed',
      width: '100%',
      textAlign: 'center',
      bottom: 0,
      marginLeft: 'auto',
      marginRight: 'auto'
    });
    return container;
  };
  out$.startSession = startSession = function(arg$, cc){
    var wordList, bpm, length, ref$, running, intervalTimer, visibleText, end, endTimer, setBpm, controls, currentLocation, step;
    wordList = arg$.wordList, bpm = arg$.bpm, length = (ref$ = arg$.length) != null ? ref$ : 60;
    console.log("Running session with", wordList, "and", bpm);
    running = true;
    intervalTimer = null;
    visibleText = null;
    end = function(){
      running = false;
      clearTimeout(endTimer);
      return step();
    };
    endTimer = setTimeout(function(){
      return end();
    }, length * 1000);
    setBpm = function(newBpm){
      step();
      bpm = newBpm;
      if (typeof removeText == 'function') {
        removeText();
      }
      clearInterval(intervalTimer);
      return intervalTimer = setInterval(step, 60 * 1000 / newBpm);
    };
    controls = showControls(bpm, setBpm, end);
    currentLocation = 0;
    step = function(){
      var whichText;
      if (visibleText != null) {
        visibleText.remove();
      }
      if (running) {
        whichText = wordList[Math.floor(Math.random() * wordList.length)];
        visibleText = showText({
          text: whichText,
          location: currentLocation
        });
        return currentLocation = 1 - currentLocation;
      } else {
        controls.remove();
        clearInterval(intervalTimer);
        return cc(bpm);
      }
    };
    return setBpm(bpm);
  };
  out$.showWordListForm = showWordListForm = function(wordList, cc){
    var render, element, i$, len$, word, x$, y$;
    wordList == null && (wordList = []);
    render = function(it){
      return CoffeeKup.render(it, {
        autoescape: true,
        wordList: wordList
      });
    };
    element = $("<form>");
    $("<h2>").text("EyeSnapper").appendTo(element);
    while (wordList.length < 6) {
      wordList = wordList.concat([""]);
    }
    for (i$ = 0, len$ = wordList.length; i$ < len$; ++i$) {
      word = wordList[i$];
      x$ = $("<input>");
      x$.addClass('test');
      x$.attr({
        autofocus: true,
        type: 'text',
        'class': 'word-input',
        placeholder: "Enter a word...",
        value: word
      });
      x$.appendTo(element);
    }
    y$ = $("<button>");
    y$.addClass('begin');
    y$.text("Begin");
    y$.appendTo(element);
    y$.click(function(){
      var wordList, res$, i$, ref$, len$, text;
      res$ = [];
      for (i$ = 0, len$ = (ref$ = element.find(".word-input")).length; i$ < len$; ++i$) {
        text = ref$[i$];
        if (text.value) {
          res$.push(text.value);
        }
      }
      wordList = res$;
      if (wordList.length) {
        element.remove();
        cc(wordList);
      }
      return false;
    });
    return element.appendTo(document.body);
  };
  $(function(){
    var start;
    start = function(wordList, bpm){
      bpm == null && (bpm = 60);
      return showWordListForm(wordList, function(wordList){
        return startSession({
          wordList: wordList,
          bpm: bpm,
          length: 60
        }, function(bpm){
          return start(wordList, bpm);
        });
      });
    };
    return start();
  });
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);

//# sourceMappingURL=data:application/json;base64,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RUFBRSxDQUFBLFNBQVUsT0FBQTs7U0FDaEIsRUFBWSxVQUFBO0lBRVYsRUFBRSxDQUFBLFNBQVUsT0FBQTtJQUNaLEVBQUUsQ0FBQSxLQUFZLE9BQUE7SUFDZCxFQUFFLENBQUEsU0FBVSxPQUFBO0lBQ1osRUFBRSxDQUFBLE1BQU0sUUFBQSxDQUFBOzs7TUFDTSxnRkFBQTtRQUFnQjtZQUF5QyxJQUFJLENBQUM7b0JBQTdELElBQUksQ0FBQzs7O01BQWxCLFFBQVUsQ0FBQSxDQUFBO01BQ1YsSUFBRyxRQUFTLENBQUMsTUFBYjtRQUNFLE9BQU8sQ0FBQyxPQUFNO1FBQ2QsR0FBRyxRQUFBOzthQUNMO0tBTE07V0FPVixPQUFPLENBQUMsU0FBUyxRQUFRLENBQUMsSUFBVDs7RUFFbkIsRUFBRSxRQUFBLENBQUE7O0lBQ0EsS0FBTSxDQUFBLENBQUEsQ0FBRSxRQUFBLENBQUEsUUFBQSxFQUFBLEdBQUE7TUFBWSxnQkFBQSxNQUFJO2FBQ3RCLGlCQUFvQixVQUFXLFFBQUEsQ0FBQSxRQUFBO2VBQzdCLGFBQ0U7VUFBQSxVQUFXO1VBQ1gsS0FBSztVQUNMLFFBQVE7UUFGUixHQUdBLFFBQUEsQ0FBQSxHQUFBO2lCQUFTLE1BQU0sVUFBVyxHQUFYO1NBSGY7T0FGZ0I7O1dBTXRCLE1BQUs7R0FSTCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBzaG93LXRleHQgPSAoe3RleHQsbG9jYXRpb24sZm9udD1cIjE1JVwifSkgLT5cbiAgcG9zc2libGUtbG9jYXRpb25zID0gW1xuICAgIFsjIGxlZnRcbiAgICAgICAge3RvcDpcIjFlbVwiLGxlZnQ6XCIxZW1cIn0sXG4gICAgICAgIHt0b3A6XCI1MCVcIixsZWZ0OlwiMWVtXCIsIG1hcmdpbi10b3A6IFwiLTAuNWVtXCJ9LFxuICAgICAgICB7Ym90dG9tOlwiMWVtXCIsbGVmdDpcIjFlbVwifSxcbiAgICBdLFxuICAgIFsjIHJpZ2h0XG4gICAgICAgIHt0b3A6XCIxZW1cIixyaWdodDpcIjFlbVwifSxcbiAgICAgICAge3RvcDpcIjUwJVwiLHJpZ2h0OlwiMWVtXCIsbWFyZ2luLXRvcDpcIi0wLjVlbVwifSxcbiAgICAgICAge2JvdHRvbTpcIjFlbVwiLHJpZ2h0OlwiMWVtXCJ9LFxuICAgIF1cbiAgXVtsb2NhdGlvbl1cbiAgbG9jYXRpb24tY3NzID0gcG9zc2libGUtbG9jYXRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpwb3NzaWJsZS1sb2NhdGlvbnMubGVuZ3RoKV1cblxuICBlbGVtZW50ID0gJChcIjxkaXY+XCIpXG4gICAgLi50ZXh0IHRleHRcbiAgICAuLmFkZC1jbGFzcyAnZXllc25hcHBlci10ZXh0LWxhYmVsJ1xuICAgIC4uY3NzIGxvY2F0aW9uLWNzcyA8PDwgZG9cbiAgICAgIGRpc3BsYXk6IFwiYmxvY2tcIlxuICAgICAgcG9zaXRpb246IFwiZml4ZWRcIlxuICAgICAgZm9udDogZm9udFxuXG4gIGVsZW1lbnQuYXBwZW5kLXRvIGRvY3VtZW50LmJvZHlcblxuZXhwb3J0IHNob3ctY29udHJvbHMgPSAoYnBtLCBzZXQtYnBtLCBlbmQpIC0+XG4gICMgU2hvdyB0aGUgY29udHJvbCBiYXIuIFJldHVybnMgYSBKUXVlcnkgc2VsZWN0b3IgdG8gdGhlIG5ld1xuICAjIGVsZW1lbnQuXG4gICMgUGFyYW1ldGVyczpcbiAgIyAgIGJwbSwgYSBudW1iZXJcbiAgIyAgIHNldC1icG0gOiAobmV3LWJwbSktPiwgd2hpY2ggaXMgY2FsbGVkIHdoZW5cbiAgIyAgICAgICAgICAgICB0aGUgdXNlciBjaGFuZ2VzIGJwbTtcbiAgIyAgIGVuZCA6IC0+LCBjYWxsZWQgd2hlbiB0aGUgdXNlciBjbGlja3MgdGhlIEV4aXQgYnV0dG9uLlxuICByZWZyZXNoLWNvbnRyb2xzID0gKGJ1dHRvbiktPlxuICAgICMgVGh1bmsgdG8gcmVmcmVzaCBidXR0b25zJyBcIkFjdGl2ZVwiIGNvbnRyb2xzXG4gICAgJCBcIi5icG0tYnV0dG9uXCIgLnJlbW92ZS1jbGFzcyBcImFjdGl2ZVwiXG4gICAgaWYgYnV0dG9uXG4gICAgICAkIGJ1dHRvbiAuYWRkLWNsYXNzIFwiYWN0aXZlXCJcbiAgZW5kLWJ1dHRvbiA9ICQgXCI8YnV0dG9uPlwiXG4gICAgLi5hZGQtY2xhc3MgXCJjb250cm9sLWJ1dHRvblwiXG4gICAgLi50ZXh0IFwiRW5kXCJcbiAgICAuLmNsaWNrIC0+IGVuZCFcbiAgZ2VuLWJ1dHRvbiA9IChiKSAtPlxuICAgICQgXCI8YnV0dG9uPlwiXG4gICAgICAuLnRleHQgXCIje2J9XCJcbiAgICAgIC4uYWRkLWNsYXNzIFwiY29udHJvbC1idXR0b25cIlxuICAgICAgLi5hZGQtY2xhc3MgXCJicG0tYnV0dG9uXCJcbiAgICAgIC4uYWRkLWNsYXNzIFwiYWN0aXZlXCIgaWYgYnBtPT1iXG4gICAgICAuLmNsaWNrIC0+IHNldC1icG0gYjsgcmVmcmVzaC1jb250cm9scyBAXG4gIGNvbnRhaW5lciA9ICQgXCI8ZGl2PlwiXG4gICAgLi5hcHBlbmQgZW5kLWJ1dHRvblxuICAgIC4uYXBwZW5kIGdlbi1idXR0b24gMTBcbiAgICAuLmFwcGVuZCBnZW4tYnV0dG9uIDE1XG4gICAgLi5hcHBlbmQgZ2VuLWJ1dHRvbiAyMFxuICAgIC4uYXBwZW5kIGdlbi1idXR0b24gMjVcbiAgICAuLmFwcGVuZCBnZW4tYnV0dG9uIDMwXG4gICAgLi5hcHBlbmQgZ2VuLWJ1dHRvbiAzNVxuICAgIC4uYXBwZW5kIGdlbi1idXR0b24gNDBcbiAgICAuLmFwcGVuZCBnZW4tYnV0dG9uIDQ1XG4gICAgLi5hcHBlbmQgZ2VuLWJ1dHRvbiA1MFxuICAgIC4uYXBwZW5kIGdlbi1idXR0b24gNTVcbiAgICAuLmFwcGVuZCBnZW4tYnV0dG9uIDYwXG4gICAgLi5hcHBlbmQgZ2VuLWJ1dHRvbiA2NVxuICAgIC4uYXBwZW5kIGdlbi1idXR0b24gNzBcbiAgICAuLmFwcGVuZCBnZW4tYnV0dG9uIDc1XG4gICAgLi5hcHBlbmQgZ2VuLWJ1dHRvbiA4MFxuICAgIC4uYXBwZW5kLXRvIGRvY3VtZW50LmJvZHlcbiAgICAuLmNzcyBkb1xuICAgICAgcG9zaXRpb246IFxcZml4ZWRcbiAgICAgIHdpZHRoOiBcXDEwMCVcbiAgICAgIHRleHQtYWxpZ246IFxcY2VudGVyXG4gICAgICBib3R0b206IDBcbiAgICAgIG1hcmdpbi1sZWZ0OiBcXGF1dG9cbiAgICAgIG1hcmdpbi1yaWdodDogXFxhdXRvXG4gIGNvbnRhaW5lclxuXG5cbmV4cG9ydCBzdGFydC1zZXNzaW9uID0gKHt3b3JkLWxpc3QsIGJwbSwgbGVuZ3RoPTYwfSwgY2MpIC0+XG4gIGNvbnNvbGUubG9nIFwiUnVubmluZyBzZXNzaW9uIHdpdGhcIiwgd29yZC1saXN0LFwiYW5kXCIsYnBtXG4gICMgU3RhcnQgYSBzZXNzaW9uLCB0aGVuIHdoZW4gaXQgZmluaXNoZXMsIHJ1biBjY1xuICBydW5uaW5nID0gdHJ1ZVxuICBpbnRlcnZhbC10aW1lciA9IG51bGxcbiAgdmlzaWJsZS10ZXh0ID0gbnVsbFxuICAjIENhbGwgdGhpcyB0byBlbmQgZXZlcnl0aGluZyBub3dcbiAgZW5kID0gLT5cbiAgICBydW5uaW5nIDo9IGZhbHNlXG4gICAgY2xlYXItdGltZW91dCBlbmQtdGltZXJcbiAgICBzdGVwIVxuICBlbmQtdGltZXIgPSBzZXQtdGltZW91dCAoLT4gZW5kISksIGxlbmd0aCoxMDAwXG4gICMgQ2FsbCB0aGlzIHRvIGNoYW5nZSB0aGUgQlBNIG5vdywgb3IgdG8gc3RhcnQgc2NoZWR1bGluZy5cbiAgc2V0LWJwbSA9IChuZXctYnBtKS0+XG4gICAgc3RlcCEgIyB0byB1cGRhdGUgZGlzcGxheSByaWdodCBhd2F5XG4gICAgYnBtIDo9IG5ldy1icG0gIyB3ZSBtdXN0IHJlbWVtYmVyIHRoaXMgZm9yIHRoZSBuZXh0IGNsaWVudFxuICAgIHJlbW92ZS10ZXh0PyFcbiAgICBjbGVhci1pbnRlcnZhbCBpbnRlcnZhbC10aW1lclxuICAgIGludGVydmFsLXRpbWVyIDo9IHNldC1pbnRlcnZhbCBzdGVwLCA2MCoxMDAwL25ldy1icG1cbiAgY29udHJvbHMgPSBzaG93LWNvbnRyb2xzIGJwbSwgc2V0LWJwbSwgZW5kXG4gICMgVG9nZ2xlcyBiZXR3ZWVuIDAgYW5kIDEgZm9yIGxlZnQgYW5kIHJpZ2h0XG4gIGN1cnJlbnQtbG9jYXRpb24gPSAwXG4gICMgUnVuIGVhY2ggc3RlcFxuICBzdGVwID0gLT5cbiAgICB2aXNpYmxlLXRleHQ/LnJlbW92ZSFcbiAgICBpZiBydW5uaW5nXG4gICAgICB3aGljaC10ZXh0ID0gd29yZC1saXN0W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp3b3JkLWxpc3QubGVuZ3RoKV1cbiAgICAgIHZpc2libGUtdGV4dCA6PSBzaG93LXRleHQgdGV4dDogd2hpY2gtdGV4dCwgbG9jYXRpb246IGN1cnJlbnQtbG9jYXRpb25cbiAgICAgIGN1cnJlbnQtbG9jYXRpb24gOj0gMSAtIGN1cnJlbnQtbG9jYXRpb25cbiAgICBlbHNlXG4gICAgICBjb250cm9scy5yZW1vdmUhXG4gICAgICBjbGVhci1pbnRlcnZhbCBpbnRlcnZhbC10aW1lclxuICAgICAgY2MgYnBtICMgd2UncmUgZG9uZSBub3dcbiAgc2V0LWJwbSBicG1cblxuZXhwb3J0IHNob3ctd29yZC1saXN0LWZvcm0gPSAod29yZC1saXN0PVtdLCBjYykgLT5cbiAgIyBTaG93IGEgd29yZCBsaXN0IGZvcm0sIHBvcHVsYXRlZCB3aXRoIGRlZmF1bHQgd29yZCBsaXN0cy5cbiAgIyBDYWxscyBjYyh3b3JkLWxpc3QpXG4gIHJlbmRlciA9IChpdCktPkNvZmZlZUt1cC5yZW5kZXIgaXQsIHthdXRvZXNjYXBlOiB0cnVlLHdvcmQtbGlzdH1cbiAgZWxlbWVudCA9ICQgXCI8Zm9ybT5cIlxuICAkIFwiPGgyPlwiIC50ZXh0IFwiRXllU25hcHBlclwiIC5hcHBlbmQtdG8gZWxlbWVudFxuICB3aGlsZSB3b3JkLWxpc3QubGVuZ3RoIDwgNlxuICAgIHdvcmQtbGlzdCA9IHdvcmQtbGlzdCArKyBbXCJcIl1cbiAgZm9yIHdvcmQgaW4gd29yZC1saXN0XG4gICAgJCBcIjxpbnB1dD5cIlxuICAgICAgLi5hZGQtY2xhc3MgXFx0ZXN0XG4gICAgICAuLmF0dHIge1xuICAgICAgICAgICAgIGF1dG9mb2N1czogdHJ1ZVxuICAgICAgICAgICAgIHR5cGU6XFx0ZXh0XG4gICAgICAgICAgICAgY2xhc3M6XFx3b3JkLWlucHV0XG4gICAgICAgICAgICAgcGxhY2Vob2xkZXI6XCJFbnRlciBhIHdvcmQuLi5cIlxuICAgICAgICAgICAgIHZhbHVlOiB3b3JkXG4gICAgICAgICAgICAgfVxuICAgICAgLi5hcHBlbmQtdG8gZWxlbWVudFxuICAkIFwiPGJ1dHRvbj5cIlxuICAgICMuLmF0dHIgdHlwZTogXCJzdWJtaXRcIlxuICAgIC4uYWRkLWNsYXNzIFxcYmVnaW5cbiAgICAuLnRleHQgXCJCZWdpblwiXG4gICAgLi5hcHBlbmQtdG8gZWxlbWVudFxuICAgIC4uY2xpY2sgLT5cbiAgICAgIHdvcmQtbGlzdCA9IFt0ZXh0LnZhbHVlIGZvciB0ZXh0IGluIGVsZW1lbnQuZmluZChcIi53b3JkLWlucHV0XCIpIHdoZW4gdGV4dC52YWx1ZV1cbiAgICAgIGlmIHdvcmQtbGlzdC5sZW5ndGhcbiAgICAgICAgZWxlbWVudC5yZW1vdmUhXG4gICAgICAgIGNjIHdvcmQtbGlzdFxuICAgICAgZmFsc2VcblxuICBlbGVtZW50LmFwcGVuZFRvIGRvY3VtZW50LmJvZHlcblxuJCAtPlxuICBzdGFydCA9ICh3b3JkLWxpc3QsIGJwbT02MCkgLT5cbiAgICBzaG93LXdvcmQtbGlzdC1mb3JtIHdvcmQtbGlzdCwgKHdvcmQtbGlzdCktPlxuICAgICAgc3RhcnQtc2Vzc2lvbiBkb1xuICAgICAgICB3b3JkLWxpc3Q6IHdvcmQtbGlzdFxuICAgICAgICBicG06IGJwbVxuICAgICAgICBsZW5ndGg6IDYwXG4gICAgICAgIChicG0pIC0+IHN0YXJ0IHdvcmQtbGlzdCwgYnBtXG4gIHN0YXJ0IVxuIl19
