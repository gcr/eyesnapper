export show-text = ({text,location,font="15%"}) ->
  possible-locations = [
    [# left
        {top:"1em",left:"1em"},
        {top:"50%",left:"1em", margin-top: "-0.5em"},
        {bottom:"1em",left:"1em"},
    ],
    [# right
        {top:"1em",right:"1em"},
        {top:"50%",right:"1em",margin-top:"-0.5em"},
        {bottom:"1em",right:"1em"},
    ]
  ][location]
  location-css = possible-locations[Math.floor(Math.random()*possible-locations.length)]

  element = $("<div>")
    ..text text
    ..add-class 'eyesnapper-text-label'
    ..css location-css <<< do
      display: "block"
      position: "fixed"
      font: font

  element.append-to document.body

export show-controls = (bpm, set-bpm, end) ->
  # Show the control bar. Returns a JQuery selector to the new
  # element.
  # Parameters:
  #   bpm, a number
  #   set-bpm : (new-bpm)->, which is called when
  #             the user changes bpm;
  #   end : ->, called when the user clicks the Exit button.
  refresh-controls = (button)->
    # Thunk to refresh buttons' "Active" controls
    $ ".bpm-button" .remove-class "active"
    if button
      $ button .add-class "active"
  end-button = $ "<button>"
    ..add-class "control-button"
    ..text "End"
    ..click -> end!
  gen-button = (b) ->
    $ "<button>"
      ..text "#{b}"
      ..add-class "control-button"
      ..add-class "bpm-button"
      ..add-class "active" if bpm==b
      ..click -> set-bpm b; refresh-controls @
  container = $ "<div>"
    ..append end-button
    ..append gen-button 10
    ..append gen-button 15
    ..append gen-button 20
    ..append gen-button 25
    ..append gen-button 30
    ..append gen-button 35
    ..append gen-button 40
    ..append gen-button 45
    ..append gen-button 50
    ..append gen-button 55
    ..append gen-button 60
    ..append-to document.body
    ..css do
      position: \fixed
      width: \100%
      text-align: \center
      bottom: 0
      margin-left: \auto
      margin-right: \auto
  container


export start-session = ({word-list, bpm, length=60}, cc) ->
  console.log "Running session with", word-list,"and",bpm
  # Start a session, then when it finishes, run cc
  running = true
  interval-timer = null
  visible-text = null
  # Call this to end everything now
  end = ->
    running := false
    clear-timeout end-timer
    step!
  end-timer = set-timeout (-> end!), length*1000
  # Call this to change the BPM now, or to start scheduling.
  set-bpm = (new-bpm)->
    step! # to update display right away
    bpm := new-bpm # we must remember this for the next client
    remove-text?!
    clear-interval interval-timer
    interval-timer := set-interval step, 60*1000/new-bpm
  controls = show-controls bpm, set-bpm, end
  # Toggles between 0 and 1 for left and right
  current-location = 0
  # Run each step
  step = ->
    visible-text?.remove!
    if running
      which-text = word-list[Math.floor(Math.random()*word-list.length)]
      visible-text := show-text text: which-text, location: current-location
      current-location := 1 - current-location
    else
      controls.remove!
      clear-interval interval-timer
      cc bpm # we're done now
  set-bpm bpm

export show-word-list-form = (word-list=[], cc) ->
  # Show a word list form, populated with default word lists.
  # Calls cc(word-list)
  render = (it)->CoffeeKup.render it, {autoescape: true,word-list}
  element = $ "<form>"
  $ "<h2>" .text "EyeSnapper" .append-to element
  while word-list.length < 6
    word-list = word-list ++ [""]
  for word in word-list
    $ "<input>"
      ..add-class \test
      ..attr {
             autofocus: true
             type:\text
             class:\word-input
             placeholder:"Enter a word..."
             value: word
             }
      ..append-to element
  $ "<button>"
    #..attr type: "submit"
    ..add-class \begin
    ..text "Begin"
    ..append-to element
    ..click ->
      word-list = [text.value for text in element.find(".word-input") when text.value]
      if word-list.length
        element.remove!
        cc word-list
      false

  element.appendTo document.body

$ ->
  start = (word-list, bpm=60) ->
    show-word-list-form word-list, (word-list)->
      start-session do
        word-list: word-list
        bpm: bpm
        length: 60
        (bpm) -> start word-list, bpm
  start!
