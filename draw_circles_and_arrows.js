function draw_circles_and_arrows(json) {
	function to_x(node_id, config) {
		return (node_id % config.max_columns) * config.column_interval;
	}
	function to_y(node_id, config) {
		return Math.floor(node_id / config.max_columns) * config.row_interval;
	}

	function to_pos(node_id, config) {
		return { 'x': to_x(node_id, config), 'y': to_y(node_id, config) };
	}

	let svg = d3.select("svg");
	let width = svg.attr("width");
	let height = svg.attr("height");

	let g = svg.append("g")
		.attr("transform", "translate(10,10)");

	g.append("svg:defs").append("svg:marker")
		.attr("id", "triangle")
		.attr("refX", 5)
		.attr("refY", 5)
		.attr("markerWidth", 25)
		.attr("markerHeight", 25)
		.attr("orient", "auto")
		.append("path")
		.attr("d", "M 0 0 10 5 0 10 2.5 5")
		.style("fill", "black");

	let config = json.config;
	let link_config = json.link_set;
	let node_config = json.node_set;

	let node_set = g.selectAll(".node")
		.data(node_config)
		.enter()
		.append("circle")
		.attr("class", "node")
		.attr("r", 5)
		.attr("cx", function(d) {
			return to_x(d.id, config);
		})
		.attr("cy", function(d) {
			return to_y(d.id, config);
		});

	let line_generator = d3.line()
		.x(function(d) { return d[0] })
		.y(function(d) { return d[1] });

	let link_set = g.selectAll(".link")
		.data(link_config)
		.enter()
		.append("path")
		.attr("class", "link")
		.attr("d", function(d) {
			let src_pos = to_pos(d.src, config);
			let dst_pos = to_pos(d.dst, config);
			let w = dst_pos.x - src_pos.x;
			let h = dst_pos.y - src_pos.y;
			let e = Math.sqrt(w * w + h * h);
			let r = (e - 15) / e;

			return line_generator([ [ src_pos.x, src_pos.y ], [ src_pos.x + w * r, src_pos.y + h * r ] ]);
		})
		.attr("marker-end", "url(#triangle)");
}

json = {
	"node_set": [
		{ "id": 0, "name": "node_0" },
		{ "id": 1, "name": "node_1" },
		{ "id": 2, "name": "node_2" },
		{ "id": 3, "name": "node_3" },
		{ "id": 4, "name": "node_4" },
		{ "id": 5, "name": "node_5" },
		{ "id": 6, "name": "node_6" },
		{ "id": 7, "name": "node_7" },
		{ "id": 8, "name": "node_8" },
		{ "id": 9, "name": "node_9" },
		{ "id": 10, "name": "node_10" },
		{ "id": 11, "name": "node_11" },
		{ "id": 12, "name": "node_12" },
		{ "id": 13, "name": "node_13" },
		{ "id": 14, "name": "node_14" },
		{ "id": 15, "name": "node_15" },
		{ "id": 16, "name": "node_16" },
		{ "id": 17, "name": "node_17" },
		{ "id": 18, "name": "node_18" },
		{ "id": 19, "name": "node_19" },
		{ "id": 20, "name": "node_20" },
		{ "id": 21, "name": "node_21" },
		{ "id": 22, "name": "node_22" },
		{ "id": 23, "name": "node_23" },
		{ "id": 24, "name": "node_24" }
	],

	"link_set": [
		{ "src": 0, "dst": 1 },
		{ "src": 5, "dst": 10 },
		{ "src": 3, "dst": 12 },
		{ "src": 9, "dst": 24 },
		{ "src": 5, "dst": 15 }
	],

	"config": 
	{
		"max_columns": 10,
		"column_interval": 100,
		"row_interval": 100
	}
}

draw_circles_and_arrows(json);
