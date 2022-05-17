# Tomodoro Development Discussions

# Todos - until dogfooding can track
- [ ] [Narwahls] - schedule show-n-tel to parents for website current tech - Pat, Fred, 
- [ ] [Narwahls] - Configure email - collect links to howto setup
- [ ] [Narwahls] - Configure DNS for email - does this require changing NS to A2Hosting ?
- [ ] [Narwahls] - Confiure file-share, figure out how to convert from Google Docs
- [ ] [Narwahls] - convert Google docs
- [ ] [Narwahls] - remove wish list from website?
- [ ] [timer] - persit timer instances
- [ ] CSS Grid Board [board]
- [ ] [board] grid container
- [ ] [board] grid lanes
- [ ] [board] grid cards
- [ ] [board] short cards
- [ ] [store] convert task to task_timer, create model TaskTimer (joined object)
- [ ] [store] TaskStore read from 'tasks.db', TaskTimer read from 'task_timer.db'
- [ ] [store] !! figure out how to migrate tables at data load (at read?)
- [ ] data lanes + storage
- [ ] [task] - lane attribute + default
- [ ] [board] - drag-drop card to lane 
- [ ] [card] - task display - name only ( postpone save details for later )
- [ ] [task] - update lane + reactivity
- [ ] [board] - select short-card per-lane
- [ ] [timer] - task id per timer instance
- [ ] [store] - category list
- [ ] [store] - category color attribute
- [ ] [card] - select category
- [ ] [card] - category display (vert - edge color)
- [ ] [store] - tags - w/ color attribute
- [ ] [card] - add/remove tags (multi)
- [ ] [board] - this-week/last-week/- last-month auto-lanes
- [ ] [board] - prev 2 month auto-lanes
- [ ] [board] - "more months" lane extend - - prev 6 mo
- [ ] Task Report [report]
- [ ] [report] - list tasks by descending - timer date
- [ ] [report] optional sort by name
- [ ] [board] - task search (data on - current view)
- [ ] [report] - search task (all time)
- [ ] [report] - pom-completed as dots, row-cell display
- [ ] [report] - 
- [ ] [card] - task detail
- [ ] [board] - banner w/ category, tag - lists
- [ ] [board] - select/highligh category/- task - multi-select - clear-selection
- [ ] [board] - filter by selected - category/task
- [ ] [report] - filter by category/task - - re-use banner? - multi-select - clear - filter
- [ ] [board] - "current task" land - the - task on active timer
- [ ] [board] - card drag to "current - task" - start timer
- [ ] [board]/[card] - click card current - timer to pause/resume
- [ ] [board]/[card] - color card - runnning (green) / pause (amber)
- [ ] [boadrd]/[card] - drag current back - to WIP - cancel w/ prompt - record - partial POM
- [ ] [timer] - persist partial timer
- [ ] [report] - show partial timer (amber dot?)
- [ ] [UX] - get color schema ideas - butterflies
- [ ] [UX] - document possible color schemes - record research links/steps
- [ ] [UX] - create HTML - UX Design Guide (CSS Scrolling animations)
- [X] [task] - edit + persist (Task)

## Reactivity vs Observables/Messaging
Mobx is a popular reactivity lib for object-store on React.  It's missing though an easy syntax for a timer (like rxjs interval() ), and it's missing messaging, the pubsub kind.

There are other messaging libs, like omnibus-rx, which is a pubsub
built upon rxjs.  This syntax is clunky though, and is not a significant improvement over the boilerplate that's needed to 
consume and use an rxjs Subject.

The possiblity of using RXjs exclusively comes to mind, and is enabled with react-rxjs. This comes with a host of edge cases around React hooks and reactivity, and ultimately requies seeveral wrapper methods AND a jsx widget <Susbscribe> in order to accomplish the react<->rxjs interop. Again this is not an improvement.

For Tomodoro, I have decided at the moment to mobx where appropriate
and rxjs where also appropriate.   hooking into rxjs as a messaging
broker requires use of useEffect in order to subscribe/unsubscribe only once in the lifecycle, which is ok, and more idiomatic to React than the other alternatives.

## task list and sort function.
sort is not reactive, "current task" is not reactive.
This seems to have a clue https://stackoverflow.com/questions/48490703/sort-nested-observable
Even though it's and Ng SO , the Rxjs is generic.