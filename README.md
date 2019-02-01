# react-grid-responsive
---
### Get started !

Install `react-grid-responsive` into your React project
```bash
npm i react-grid-responsive
```
Then import `react-grid-responsive` into your React component
```javascript
import ReactGridResponsive from "react-grid-responsive"

class MyComponent extends React.Component {
  state = {
    isStatic: false,
  	height: 400,
    grids: [
      {
        id: 'grid-1',
        lg: { x: 0, y: 0, w: 3, h: 5 },
        md: { x: 0, y: 0, w: 4, h: 5 },
        sm: { x: 0, y: 0, w: 6, h: 5 },
        xs: { x: 0, y: 0, w: 12, h: 5 },
        xxs: { x: 0, y: 0, w: 12, h: 5 }
      },
      {
        id: 'grid-2',
        lg: { x: 3, y: 0, w: 3, h: 5 },
        md: { x: 4, y: 0, w: 4, h: 5 },
        sm: { x: 6, y: 0, w: 6, h: 5 },
        xs: { x: 0, y: 2, w: 12, h: 5 },
        xxs: { x: 0, y: 2, w: 12, h: 5 }
      },
      {
        id: 'grid-3',
        lg: { x: 6, y: 0, w: 3, h: 5 },
        md: { x: 8, y: 0, w: 4, h: 5 },
        sm: { x: 0, y: 2, w: 6, h: 5 },
        xs: { x: 0, y: 4, w: 6, h: 5 },
        xxs: { x: 0, y: 4, w: 12, h: 5 }
      },
      {
        id: 'grid-4',
        lg: { x: 9, y: 0, w: 3, h: 5 },
        md: { x: 0, y: 2, w: 4, h: 5 },
        sm: { x: 6, y: 2, w: 6, h: 5 },
        xs: { x: 6, y: 4, w: 6, h: 5 },
        xxs: { x: 0, y: 6, w: 12, h: 5 }
      }
    ]
  }

  updateContainer = container => {
    this.setState({
      height: container.height,
      grids: container.boxes
    })
  }

  updateGrid = i => box => {
    this.setState(state => {
      let copyBoxes = state.grids
      copyBoxes[i] = box

      return {
        grids: copyBoxes
      }
    })
  }

  render () {
    return (
      <ReactGridResponsive
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={12}
        rowHeight={30}
        height={this.state.height}
        isStatic={this.state.isStatic}
        onChange={this.updateContainer}
        onBreakpointChange={this.updateContainer}
        onWidthChange={this.updateContainer}>
        {
          this.state.grids.map((grid, i) => {
            return (
              <div
                key={i}
                onDrag={this.updateGrid(i)}
                onDragEnd={this.updateGrid(i)}
                onResizeEnd={this.updateGrid(i)}
                id={grid.id}
                box={grid}>
                {grid.id}
              </div>
            )
          })
        }
      </ReactGridResponsive>
    )
  }
}
```

### Props
```javascript
// ReactGridResponsive
{
  onChange: func, // function (container)
  onBreakpointChange: func, // function (container)
  onWidthChange: func, // function (container)

  breakpoints: object, // { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }
  cols: number, // 12
  rowHeight: number, // 30
  height: number, // 400
  isStatic: boolean // true | false
}

/* function (container) => container
{
    height: number, // 400
    width: number, // 800
    breakpoint: string, // "lg" | "md" | "sm" ...
    boxes: array, // [ box ]
}
*/

// ReactGridResponsive.children
{
  onDragStart: func, // function (box)
  onDrag: func, // function (box)
  onDragEnd: func, // function (box)
  onResizeStart: func, // function (box)
  onResize: func, // function (box)
  onResizeEnd: func, // function (box)

  box: object // box
}

/* function (box) => box
{
    id: string, // "grid-1"
    lg: object, // { x: ?, y: ?, w: ?, h: ? }
    md: object, // { x: ?, y: ?, w: ?, h: ? }
    sm: object, // { x: ?, y: ?, w: ?, h: ? }
    xs: object, // { x: ?, y: ?, w: ?, h: ? }
    xxs: object // { x: ?, y: ?, w: ?, h: ? }
}
*/
```
This project bundled using [Webpack](https://webpack.js.org/)

If you want to help on development, you can clone / fork this `repo`, then install all dependencies:
```bash
npm install
```

I use `webpack-dev-server` for development, simply run the dev server:
```bash
npm start // in your browser open http://localhost:3001
```

Thank you.
