async function draw() {
  // Data
  const dataset = await d3.csv("edit-data/data.csv");

  const parseDate = d3.timeParse("%Y-%m");
  const xAccessor = (d) => parseDate(d.date);
  const yAccessor = (d) => parseInt(d.number);

  // Dimensions
  let dimensions = {
    width: 1000,
    height: 500,
    margins: 50,
  };

  dimensions.ctrWidth = dimensions.width - dimensions.margins * 2;
  dimensions.ctrHeight = dimensions.height - dimensions.margins * 2;

  // Draw Image
  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);

  const ctr = svg
    .append("g") // <g>
    .attr("transform", `translate(${dimensions.margins}, ${dimensions.margins})`);

  const tooltip = d3.select("#tooltip");
  const tooltipDot = ctr
    .append("circle")
    .attr("r", 5)
    .attr("fill", "#fc8781")
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .style("opacity", 0)
    .style("pointer-events", "none");

  // Scales
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.ctrHeight, 0])
    .nice();

  const xExtent = d3.extent(dataset, xAccessor);
  xExtent[1] = d3.timeMonth.offset(xExtent[1], 1); // 将范围扩展一个月
  const xScale = d3.scaleTime().domain(xExtent).range([0, dimensions.ctrWidth]);

  // console.log(xScale(xAccessor(dataset[0])), dataset[0])

  // 设置条形宽度为x轴范围的1/2或其他适合的宽度
  const barWidth = (dimensions.ctrWidth / dataset.length) * 0.8;

  ctr
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", (d) => xScale(xAccessor(d)) - barWidth / 2) // 中心对齐
    .attr("y", dimensions.ctrHeight) // 初始位置在图表底部
    .attr("width", barWidth) // 设置条形宽度
    .attr("height", 0) // 初始高度为0
    .attr("fill", "#F28C48") // 设置填充颜色
    .attr("stroke", "black") // 边框颜色
    .attr("stroke-width", 1) // 边框宽度
    .transition() // 开始过渡动画
    .duration(1000) // 动画持续时间1秒
    .attr("y", (d) => yScale(yAccessor(d))) // 目标位置
    .attr("height", (d) => dimensions.ctrHeight - yScale(yAccessor(d))); // 目标高度

  // Draw Axes
  const xAxis = d3.axisBottom(xScale);

  const xAxisGroup = ctr
    .append("g")
    .call(xAxis)
    .style("transform", `translateY(${dimensions.ctrHeight}px)`);

  const yAxis = d3.axisLeft(yScale).tickFormat((d) => `${d}`);

  const yAxisGroup = ctr.append("g").call(yAxis);

  // Tooltip
  ctr
    .append("rect")
    .attr("width", dimensions.ctrWidth)
    .attr("height", dimensions.ctrHeight)
    .style("opacity", 0)
    .on("touchmouse mousemove", function (event) {
      const mousePos = d3.pointer(event, this);
      const date = xScale.invert(mousePos[0]); // 把横坐标逆转换为date, mousePos[0]是鼠标位置的横坐标
      // const index = d3.bisector(dataset, date) 行不通因为d3.biscet不能自动识别object的位置因此需要自创一个bisector

      // Custom Bisector - left, center, right
      const bisector = d3.bisector(xAccessor).left; // The xAccessor function will hep d3 access the date within the dataset, and it'll parse the date into a date object since the date is stored as a string
      const index = bisector(dataset, date);
      const stock = dataset[index - 1];

      // Update Image
      tooltipDot
        .style("opacity", 1)
        .attr("cx", xScale(xAccessor(stock)))
        .attr("cy", yScale(yAccessor(stock)))
        .raise();

      tooltip
        .style("display", "block")
        .style("top", yScale(yAccessor(stock)) - 20 + "px")
        .style("left", xScale(xAccessor(stock)) + "px");

      tooltip.select(".number").html(`<strong>${yAccessor(stock)}</strong>`);
      const dateFormatter = d3.timeFormat("%B, %Y");
      tooltip.select(".date").text(dateFormatter(xAccessor(stock)));
    })
    .on("mouseleave", function (event) {
      tooltipDot.style("opacity", 0);
      tooltip.style("display", "none");
    });

  // 定义斜线填充模式
  svg
    .append("defs")
    .append("pattern")
    .attr("id", "diagonalStripes")
    .attr("patternUnits", "userSpaceOnUse")
    .attr("width", 8) // 调整宽度控制斜线间距
    .attr("height", 8) // 调整高度控制斜线间距
    .append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 8)
    .attr("y2", 8)
    .attr("stroke", "#d3d3d3") // 斜线颜色
    .attr("stroke-width", 2); // 斜线宽度

  // 添加带有斜线填充的背景矩形
  ctr
    .append("rect")
    .attr("x", xScale(new Date(2022, 3))) // 2022年4月
    .attr("y", 0)
    .attr("width", xScale(new Date(2022, 12)) - xScale(new Date(2022, 3))) // 到2023年10月
    .attr("height", dimensions.ctrHeight)
    .attr("fill", "url(#diagonalStripes)")
    .style("pointer-events", "none");

  // 添加注释文字
  ctr
    .append("text")
    .attr("x", xScale(new Date(2022, 3)) + 20) // X轴偏移一些
    .attr("y", yScale(1500)) // Y轴位置
    .style("font-size", "13px")
    .style("font-family", "Arial")
    .style("fill", "black")
    .style("font-weight", "500")
    .selectAll("tspan")
    .data(["COVID lockdown policy", "started in Shanghai"]) // 每行一个字符串
    .enter()
    .append("tspan")
    .attr("x", xScale(new Date(2022, 3)) + 20) // 每行的X位置
    .attr("dy", (d, i) => i * 15) // 每行的Y位置偏移，调整15以控制行距
    .text((d) => d); // 设置文本内容

  // 添加注释箭头
  ctr
    .append("line")
    .attr("x1", xScale(new Date(2022, 3)) + 60) // 箭头起点
    .attr("y1", yScale(1100))
    .attr("x2", xScale(new Date(2022, 3))) // 箭头指向位置
    .attr("y2", yScale(200))
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("marker-end", "url(#arrow)"); // 添加箭头（需要定义）

  svg
    .append("defs")
    .append("marker")
    .attr("id", "arrow")
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 5)
    .attr("refY", 5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto-start-reverse")
    .append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 Z")
    .attr("fill", "black");
}

draw();
