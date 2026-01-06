## Using <template>
- [ ] Move template literals (${}) from code, to programmatic setting.
- [ ] Use templates instead of strings.

## Reasonable event handling

1. A component is either a Web Component, or a function returning a DocumentFragment.
2. We can make a component emit an event. And also make a component listen to the event. This can happen upon component creation as the existence of the component OR the event, is not mandatory for this to work. At runtime, though, these connect.
3. For this to work, I need to be able to create components with something resembling HTML and in the same function, attaching event listeners to pieces of that component.
4. In response to an event, a node can either
   1. Emit more events.
   2. Change it's own DOM.

## Track exercise component
1. [x] Parameterized data -> {setsWithWeight: {weight: "120kg", sets: [10, 11, 12]}, comment: "bla bla"}, defaults being nothing. However, the default for number of sets should be 1, as at least one must be displayed, and this is already in the HTML.
2. [x] Set inputs render based on the value of "number of sets input". However, for the initial load, ie, if the number of sets param is null, the default rendering applies. BUT, when the number of sets is given, then the rendering is dynamic.
3. [x] Likewise, when the number of sets input increases, a new input gets added. And when it decreases, inputs get deleted. Also, the way to do this is the following: when the number of sets number changes ("onchange"), it sends a custom event, which is caught by the parent, triggering the following behavior. The parent will count the number of current inputs, compare it to the number of sets in the event, and determine whether to add or remove inputs. No need to store state, and no need to touch values. 
4. [x] When the plus input is pressed, this triggers an event called something like "add set" and this should naturally trigger the "onchange" of the "number of sets input" requiring no extra work.
5. [ ] New weight renders a new tuple of weight and sets.
6. [ ] Finish will make propagate to the parent, where it will be handled.
7. [ ] The track-exercise will catch the above event, and read the data, and remove the form itself, and add back a start-exercise element.
8. [ ] Then, I will create the "exercises" custom component. Which will contain an "exercise" piece of html.
9. [ ] When the finish form gets submitted, the parent will catch it and somehow tell the "exercises" component to add an exercise, with the proper data, etc.
---
- [ ] Figure out how forms work.
  - Shoelace doesn't affect canonical HTML forms, but it does provide helpers for cases of overriding default form behavior (using fetch + form data etc)
- [ ] Figure out how localization works, as it affects params being passed as strings..
  - Localization requires some imports, and doesn't affect too many components, really.
- [x] Use separate vertical and horizontal spacing, and on mobile, only affect horizontal spacing. Vertical can stay the same.
## Notes
- SHOELACE IS SO GOOD! and a perfect abstraction. Doesn't mess with regular HTML tags, and creates all the widgets for me. The perfect abstraction level. It's always bothered me how HTML/CSS REQUIRES YOU TO PROGRAM WIDGETS!!! This is WEIRD for UI. It necessitates creating a design system, from every programmer, or company. And the alternatives are CSS frameworks. WRONG ABSTRACTION LEVEL. WRONG WRONG. Programmers are perfectly capable of coding UI logic. The problem is when you have to create widgets yourself, on a platform as cursed as the browser. So shoelace is, imho, top top, amazing!**