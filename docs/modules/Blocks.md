---
title: Block Manager
---

# Block Manager

<p align="center"><img src="http://grapesjs.com/img/sc-grapesjs-blocks-prp.jpg" alt="GrapesJS - Block Manager" height="400" align="center"/></p>

The Block is a group of [Components] and can be easily reused inside templates.

To better understand the difference between components and blocks, the component is more atomic so, for example, a single image,  a text box or a map fits perfectly in this concept. The block is what the end user will drag inside the canvas, so it could contain a single image (single Component) or the entire section like, for example, the footer with a lot of components inside (texts, images, inputs, etc).

Check [Components] page to see the list of built-in components and how to create your own.

Let's see how to add a new block to the editor using the [Blocks API]

```js
var editor = grapesjs.init({...});
var blockManager = editor.BlockManager;

// 'my-first-block' is the ID of the block
blockManager.add('my-first-block', {
  label: 'Simple block',
  content: '<div class="my-block">This is a simple block</div>',
});
```

With this snippet a new block will be added to the collection. You can also update existent blocks

```js
blockManager.get('my-first-block').set({
  label: 'Updated simple block',
  attributes: {
    title: 'My title'
  }
})
```

As you see a simple HTML string is enough to create a block, the editor will do the rest.
If you want you could also pass an object representing the [Component].

```js
blockManager.add('my-map-block', {
  label: 'Simple map block',
  content: {
    type: 'map', // Built-in 'map' component
    style: {
      height: '350px'
    },
    removable: false, // Once inserted it can't be removed
  }
})
```

From the v0.3.70 it's also possible to pass the HTML string with Component's properties as attributes.

```js
blockManager.add('the-row-block', {
  label: '2 Columns',
  content: '<div class="row" data-gjs-droppable=".row-cell" data-gjs-custom-name="Row">' +
      '<div class="row-cell" data-gjs-draggable=".row"></div>' +
      '<div class="row-cell" data-gjs-draggable=".row"></div>' +
    '</div>',
});
```

In the example above you're defining a row component which will accept only elements which match '.row-cell' selector and cells which could be dragged only inside '.row' elements. We're also defining the custom name which will be seen inside the Layers panel.
If you want to check the complete list of available Component's properties, check directly the Component model source:
https://github.com/artf/grapesjs/blob/dev/src/dom_components/model/Component.js


[Component]: <Component>
[Components]: <Components>
[Blocks API]: <API-Block-Manager>
