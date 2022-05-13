# Tomodoro Development Discussions

## Reactivity vs Observables/Messaging
Mobx is a popular reactivity lib for object-store on React.  It's missing though easy syntax for a timer (like rxjs interval() ), and it's missing messaging, the pubsub kind.

There are other messaging libs, like omnibus-rx, which is a pubsub
built upon rxjs.  This syntax is clunky though, and is not a significant improvement over the boilerplate that's needed to 
consume and use an rxjs Subject.

The possiblity of using RXjs exclusively comes to mind, and is enabled with react-rxjs. This comes with a host of edge cases around React hooks and reactivity, and ultimately requies seeveral wrapper methods AND a jsx widget <Susbscribe> in order to accomplish the react<->rxjs interop. Again this is not an improvement.

For Tomodoro, I have decided at the moment to mobx where appropriate
and rxjs where also appropriate.   hooking into rxjs as a messaging
broker requires use of useEffect in order to subscribe/unsubscribe only once in the lifecycle, which is ok, and more idiomatic to React than the other alternatives.
