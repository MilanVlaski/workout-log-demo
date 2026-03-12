- [x] Deploy to github pages.
- [ ] Write automation code for the entire thing.
- [ ] "Why workout logging? -> Make a blog.
- [ ] Localization.
- [ ] And talk about how nice shoelace is, and why it's nice.
- [x] Make start exercise label not show *
- [x] Theme. Change primary color to yellow.
- [x] Write a nice header component.
- [x] Workout log has an export option, but it's not available for demo.
  - [x] Think of a better way to communicate demo, and where to see the real product.
- [x] ~~Maybe make a workout in a log editable, by reading the workout data, and loading it into the editing page. Can go in the query values. When the user is done, they can perform a PUT on the backend, where we will fetch the thing. ~~
  
## Rules for Vanilla 

1. Use <template> (according to Yamasaki Vukelic)
2. Use event delegation, to have fewer custom events, fewer lines of code.
   
### Common Vanilla workflow
1. Start with HTML on the page, with "hard coded" data values. Unnecessary if we know what the GUI should look like, but that's rare - usually, we want to prototype at least a little bit. Add classes, for specific sections/
2. Add CSS.
3. Extract the HTML, piece by piece, into web components with innerHTML.
4. Extract the HTML from the web components into <templates> on the initial page.
5. In the web component, usually in the script itself, get the <template> by id, and populate it with test data.
6. Add dynamic behavior, which will 

Maybe it's better to add dynamism (JS) before extracting the HTML into web components/templates.


## Track exercise component
1. [x] Parameterized data -> {setsWithWeight: {weight: "120kg", sets: [10, 11, 12]}, comment: "bla bla"}, defaults being nothing. However, the default for number of sets should be 1, as at least one must be displayed, and this is already in the HTML.
2. [x] Set inputs render based on the value of "number of sets input". However, for the initial load, ie, if the number of sets param is null, the default rendering applies. BUT, when the number of sets is given, then the rendering is dynamic.
3. [x] Likewise, when the number of sets input increases, a new input gets added. And when it decreases, inputs get deleted. Also, the way to do this is the following: when the number of sets number changes ("onchange"), it sends a custom event, which is caught by the parent, triggering the following behavior. The parent will count the number of current inputs, compare it to the number of sets in the event, and determine whether to add or remove inputs. No need to store state, and no need to touch values. 
4. [x] When the plus input is pressed, this triggers an event called something like "add set" and this should naturally trigger the "onchange" of the "number of sets input" requiring no extra work.
5. [x] New weight renders a new tuple of weight and sets.
6. [x] Finish will propagate to the parent, where it will be handled.
7. [x] The track-exercise will catch the above event, and read the data, and remove the form itself, and add back a start-exercise element.
8. [x] Then, I will create the "exercises" custom component. Which will contain an "exercise" piece of html.
9. [x] When the finish form gets submitted, the parent will catch it and somehow tell the "exercises" component to add an exercise, with the proper data, etc.
---
- [x] Add x button for individual exercises
- [x] Put the workout log in sessionstorage, as json, I guess.
- [x] Make the workout log page.
  - [x] 1. Make sure it renders a message like "No workouts yet." if null.
  - [x] 2. Discuss whether we should use HTML text, or just textarea. HTML is convenient, because we definitely want interactivity later. But i'm thinking we use <br> a lot, and treat the whole log as a paragraph, or so.  Or not, we could also use a <p> for each workout.
  - [x] 3. Serialize json from session storage into the textarea, in an appropriate format.
Arms: 26.06.2025.
Bicep curl: 10 9 8 80lb 10 9 70lb (Comment)
Bicep curl: 10 9 8 80lb (Comment)
Bicep curl: 10 9 8 80lb (Comment)

Arms: 26.06.2025.
Bicep curl: 10 9 8 80lb 10 9 70lb (Comment)
Bicep curl: 10 9 8 80lb (Comment)
Bicep curl: 10 9 8 80lb (Comment)
- [x] Make sure the reps are not empty.
- [x] Make sure the weight is not rendered in 
- [x] Figure out how forms work.
  - Shoelace doesn't affect canonical HTML forms, but it does provide helpers for cases of overriding default form behavior (using fetch + form data etc)
- [x] Figure out how localization works, as it affects params being passed as strings..
  - Localization requires some imports, and doesn't affect too many components, really.
- [x] Use separate vertical and horizontal spacing, and on mobile, only affect horizontal spacing. Vertical can stay the same.
## Notes
- Stick to simple page.html + page.css + page.js, where your page.js may contain web components that are used on that page. This allows you to reuse <template> elements on that page.
- SHOELACE IS SO GOOD! and a perfect abstraction. Doesn't mess with regular HTML tags, and creates all the widgets for me. The perfect abstraction level. It's always bothered me how HTML/CSS REQUIRES YOU TO PROGRAM WIDGETS!!! This is WEIRD for UI. It necessitates creating a design system, from every programmer, or company. And the alternatives are CSS frameworks. WRONG ABSTRACTION LEVEL. WRONG WRONG. Programmers are perfectly capable of coding UI logic. The problem is when you have to create widgets yourself, on a platform as cursed as the browser. So shoelace is, imho, top top, amazing!**
