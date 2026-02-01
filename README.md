# Frontend Mentor - Tip calculator app solution

This is a solution to the [Tip calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Calculate the correct tip and total cost of the bill per person

### Screenshot

![Completed Project Screenshot](/completed-project-screenshot.png)

### Links

- [Github Repository](https://github.com/s2i61m97o/tip-calculator)
- [Live Site](https://s2i61m97o.github.io/tip-calculator)

## My process

### Built with

- Semantic HTML5 markup
- Flexbox
- Mobile-first workflow
- SASS
- JavaScript

### What I learned

I learnt how to limit inputs to a set amount of decimal places, or no decimal places, for number input in real time. This is done by retrieving the input on changes, and slicing off unwanted values - such as anything more than two decimal places, and setting the value of the input to the new value. From the user perspective, this then does not allow for input different to what is required.

I also learnt that about enabling and disabling components, such as button in this case, in JavaScript.

### Continued development

I will continue to look at refactoring code, and trying to make it DRY. I may come back to this project to refactor code where I can.

### Useful resources

- I used [this css-tricks](https://css-tricks.com/snippets/css/turn-off-number-input-spinners/) to remove the step arrows for the number inputs, as I did not like them being part of the app.

## Author

- Frontend Mentor - [@s2i61m97o](https://www.frontendmentor.io/profile/s2i61m97o)
