use wasm_bindgen::prelude::*;
use web_sys::HtmlCanvasElement;

mod rect;

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

/// Type alias for the result of a drawing function.
pub type DrawResult<T> = Result<T, Box<dyn std::error::Error>>;

/// Type used on the JS side to convert screen coordinates to chart
/// coordinates.
#[wasm_bindgen]
pub struct Chart {
    convert: Box<dyn Fn((i32, i32)) -> Option<(f64, f64)>>,
    rect_x: f64,
    rect_y: f64,
}

/// Result of screen to chart coordinates conversion.
#[wasm_bindgen]
pub struct Point {
    pub x: f64,
    pub y: f64,
}

#[wasm_bindgen]
impl Chart {
    /// Draw a rectangle on the provided canvas element.
    pub fn draw_rectangle(canvas: HtmlCanvasElement, rect_x: f64, rect_y: f64) -> Result<Chart, JsValue> {
        let map_coord = rect::draw(canvas,rect_x,rect_y).map_err(|err| err.to_string())?;
        Ok(Chart {
            convert: Box::new(map_coord),
            rect_x: rect_x,
            rect_y: rect_y
        })
    }

    /// This function can be used to convert screen coordinates to
    /// chart coordinates.
    pub fn coord(&self, x: i32, y: i32) -> Option<Point> {
        (self.convert)((x, y)).map(|(x, y)| Point { x, y })
    }
}
