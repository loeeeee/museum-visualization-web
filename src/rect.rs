use crate::DrawResult;
use plotters::prelude::*;
use plotters_canvas::CanvasBackend;
use web_sys::HtmlCanvasElement;

/// Draw a rectangle on the canvas.
pub fn draw(canvas: HtmlCanvasElement) -> DrawResult<impl Fn((i32, i32)) -> Option<(f64, f64)>> {
    let root = CanvasBackend::with_canvas_object(canvas)
        .unwrap()
        .into_drawing_area();
    root.fill(&WHITE)?;

    let mut chart = ChartBuilder::on(&root)
        .margin(10u32)
        .caption("Rectangle Example", ("sans-serif", 20).into_font())
        .x_label_area_size(30u32)
        .y_label_area_size(30u32)
        .build_cartesian_2d(0f64..100f64, 0f64..100f64)?;

    chart.configure_mesh().x_labels(3).y_labels(3).draw()?;

    // Drawing a rectangle
    chart.draw_series(std::iter::once(Rectangle::new(
        [(10f64, 10f64), (60f64, 60f64)],
        RED.filled(),
    )))?;

    root.present()?;
    return Ok(Box::new(chart.into_coord_trans()));
}
