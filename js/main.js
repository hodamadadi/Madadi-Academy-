(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner(0);

  // Initiate the AOS


  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 45) {
      $(".navbar").addClass("sticky-top shadow-sm");
    } else {
      $(".navbar").removeClass("sticky-top shadow-sm");
    }
  });

  // Hero Header carousel
  $(".header-carousel").owlCarousel({
    animateOut: "slideOutDown",
    items: 1,
    autoplay: true,
    smartSpeed: 1000,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
  });

  // International carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    items: 1,
    smartSpeed: 1500,
    dots: true,
    dotsData: true,
    loop: true,
    margin: 25,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
  });

// testimonial carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    center: true,
    dots: true,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  function myMove() {
    let id = null;
    const elem = document.getElementById("animate");
    let pos = 0;
    clearInterval(id);
    id = setInterval(frame, 5);
    function frame() {
      if (pos == 350) {
        clearInterval(id);
      } else {
        pos++;
        elem.style.top = pos + "px";
        elem.style.left = pos + "px";
      }
    }
  }
})(jQuery);
// Blog
am5.ready(function() {

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);

root.container.set("layout", root.verticalLayout);

// Create container to hold charts
var chartContainer = root.container.children.push(am5.Container.new(root, {
  layout: root.horizontalLayout,
  width: am5.p100,
  height: am5.p100
}));

// Create the 1st chart
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
var chart = chartContainer.children.push(
  am5percent.PieChart.new(root, {
    endAngle: 270,
    innerRadius: am5.percent(60)
  })
);


var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "category",
    endAngle: 270,
    alignLabels: false
  })
);

series.children.push(am5.Label.new(root, {
  centerX: am5.percent(50),
  centerY: am5.percent(50),
  text: "First: {valueSum}",
  populateText: true,
  fontSize: "1.5em"
}));

series.slices.template.setAll({
  cornerRadius: 8
})

series.states.create("hidden", {
  endAngle: -90
});

series.labels.template.setAll({
  textType: "circular"
});


// Create the 2nd chart
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
var chart2 = chartContainer.children.push(
  am5percent.PieChart.new(root, {
    endAngle: 270,
    innerRadius: am5.percent(60)
  })
);

var series2 = chart2.series.push(
  am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "category",
    endAngle: 270,
    alignLabels: false,
    tooltip: am5.Tooltip.new(root, {}) // a separate tooltip needed for this series
  })
);

series2.children.push(am5.Label.new(root, {
  centerX: am5.percent(50),
  centerY: am5.percent(50),
  text: "Second: {valueSum}",
  populateText: true,
  fontSize: "1.5em"
}));

series2.slices.template.setAll({
  cornerRadius: 8
})

series2.states.create("hidden", {
  endAngle: -90
});

series2.labels.template.setAll({
  textType: "circular"
});


// Duplicate interaction
// Must be added before setting data
series.slices.template.events.on("pointerover", function(ev) {
  var slice = ev.target;
  var dataItem = slice.dataItem;
  var otherSlice = getSlice(dataItem, series2);

  if (otherSlice) {
    otherSlice.hover();
  }
});

series.slices.template.events.on("pointerout", function(ev) {
  var slice = ev.target;
  var dataItem = slice.dataItem;
  var otherSlice = getSlice(dataItem, series2);

  if (otherSlice) {
    otherSlice.unhover();
  }
});

series.slices.template.on("active", function(active, target) {
  var slice = target;
  var dataItem = slice.dataItem;
  var otherSlice = getSlice(dataItem, series2);

  if (otherSlice) {
    otherSlice.set("active", active);
  }
});

// Same for the 2nd series
series2.slices.template.events.on("pointerover", function(ev) {
  var slice = ev.target;
  var dataItem = slice.dataItem;
  var otherSlice = getSlice(dataItem, series);

  if (otherSlice) {
    otherSlice.hover();
  }
});

series2.slices.template.events.on("pointerout", function(ev) {
  var slice = ev.target;
  var dataItem = slice.dataItem;
  var otherSlice = getSlice(dataItem, series);

  if (otherSlice) {
    otherSlice.unhover();
  }
});

series2.slices.template.on("active", function(active, target) {
  var slice = target;
  var dataItem = slice.dataItem;
  var otherSlice = getSlice(dataItem, series);

  if (otherSlice) {
    otherSlice.set("active", active);
  }
});


// Set data
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
series.data.setAll([{
  category: "Educational Awards Won",
  value: 341
}, {
  category: "Student Enrollment Growth",
  value: 301
}, {
  category: " Courses Offered",
  value: 158
}, {
  category: "Workshops",
  value: 100
}]);

// Set data
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
series2.data.setAll([{
  category: "Educational Awards Won",
  value: 501
}, {
  category: "Student Enrollment Growth",
  value: 301
}, {
  category: " Courses Offered",
  value: 201
}, {
  category: "Workshops",
  value: 165
}]);



function getSlice(dataItem, series) {
  var otherSlice;
  am5.array.each(series.dataItems, function(di) {
    if (di.get("category") === dataItem.get("category")) {
      otherSlice = di.get("slice");
    }
  });

  return otherSlice;
}

// Create legend
var legend = root.container.children.push(am5.Legend.new(root, {
  x: am5.percent(50),
  centerX: am5.percent(50)
}));


// Trigger all the same for the 2nd series
legend.itemContainers.template.events.on("pointerover", function(ev) {
  var dataItem = ev.target.dataItem.dataContext;
  var slice = getSlice(dataItem, series2);
  slice.hover();
});

legend.itemContainers.template.events.on("pointerout", function(ev) {
  var dataItem = ev.target.dataItem.dataContext;
  var slice = getSlice(dataItem, series2);
  slice.unhover();
});

legend.itemContainers.template.on("disabled", function(disabled, target) {
  var dataItem = target.dataItem.dataContext;
  var slice = getSlice(dataItem, series2);
  if (disabled) {
    series2.hideDataItem(slice.dataItem);
  }
  else {
    series2.showDataItem(slice.dataItem);
  }
});

legend.data.setAll(series.dataItems);

series.appear(1000, 100);

}); // end am5.ready()
//Counter
document.addEventListener("alpine.init", ()=>{
  Alpine.data('toggleSlidebar', ()=>({
    open:window.innerWidth <= 992 ? false:true,
    toggle(){
      this.open =! this.open
    }

  })),
  Alpine.data("drapdown", ()=>({
    open:false,
    toggle(){
      this.open = ! this.open
    }
  }))
})
