/*
homework 7, dynamic multiplication table
Robert Wentzell, UMass Lowell Computer Science, rwentzel@cs.uml.edu
Copyright (c) 2020 by Robert Wentzell. All rights reserved. May be
freely
copied or excerpted for educational purposes with credit to the
author.
updated by Robert Wentzell 11/27/2020
*/
var tabIndex = 1;

function auto_submit() {
  if( $("form#mult_form").valid() == true ) {
    $("form#mult_form").submit();
  }
}
function save_tab() {
  // these were SUPER useful
  // URL: https://stackoverflow.com/questions/18572586/append-to-dynamically-created-tab
  // https://jsfiddle.net/EKBqy/
  var tabCount = $("#tabs li").length + 1;
  console.log("Current number of tabs: " + tabCount);
  if(tabCount > 20) {
    alert("Too many tables");
    return false;
  }

  $( "#tabs" ).tabs();
  var hor_start = Number(document.getElementById('horiz_start').value);
  var hor_end = Number(document.getElementById('horiz_end').value);
  var vert_start = Number(document.getElementById('vert_start').value);
  var vert_end = Number(document.getElementById('vert_end').value);

  tabIndex++;

  var title = "<li class='tab'><a href='#tab-" + tabIndex + "'>" + hor_start +
              " to " + hor_end + " by " + vert_start + " to " + vert_end + "</a>" +
              "<span class='ui-icon ui-icon-close' role='presentation'></span>" + "</li>";

  $( "div#tabs ul" ).append( title );
  $( "div#tabs" ).append('<div id="tab-' + tabIndex + '">' + $("#multiplication_table").html() + '</div>');
  $( "#tabs" ).tabs("refresh");
  $( "#tabs" ).tabs("option", "active", -1);

  // remove button https://jqueryui.com/tabs/#manipulation
  $( "#tabs" ).delegate( "span.ui-icon-close", "click", function() {
      var panelID = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      $( "#" + panelID ).remove();

      try {
        $( "#tabs" ).tabs("refresh");
      }
      catch (e) {
      }

      // URL: https://api.jqueryui.com/tabs/#method-destroy
      if( $('div#tabs ul li.tab').length == 0) {
        try {
          $("#tabs").tabs("destroy");
        }
        catch (e) {
        }

        return false;
      }
  });
}

function slider() {


  // URL: https://jqueryui.com/slider/#hotelrooms

  // Horizontal Start
  $("#slider_hor_start").slider({
    min: -50,
    max: 50,
    slide: function(event, ui) {
      $("#horiz_start").val(ui.value);
      auto_submit();
    }
  });
  $("#horiz_start").on("keyup", function() {
    $("#slider_hor_start").slider("value", this.value);
    auto_submit();
  });

  // Horizontal End
  $("#slider_hor_end").slider({
    min: -50,
    max: 50,
    slide: function(event, ui) {
      $("#horiz_end").val(ui.value);
      auto_submit();
    }
  });
  $("#horiz_end").on("keyup", function() {
    $("#slider_hor_end").slider("value", this.value);
    auto_submit();
  });

  // Vertical Start
  $("#slider_vert_start").slider({
    min: -50,
    max: 50,
    slide: function(event, ui) {
      $("#vert_start").val(ui.value);
      auto_submit();
    }
  });
  $("#vert_start").on("keyup", function() {
    $("#slider_vert_start").slider("value", this.value);
    auto_submit();
  });

  // Vertical End
  $("#slider_vert_end").slider({
    min: -50,
    max: 50,
    slide: function(event, ui) {
      $("#vert_end").val(ui.value);
      auto_submit();
    }
  });
  $("#vert_end").on("keyup", function() {
    $("#slider_vert_end").slider("value", this.value);
    auto_submit();
  });
}


function validate() {
  $("#mult_form").validate({
    rules: {
      horiz_start: {
        number: true,
        min: -50,
        max: 50,
        required: true
      },
      horiz_end: {
        number: true,
        min: -50,
        max: 50,
        required: true
      },
      vert_start: {
        number: true,
        min: -50,
        max: 50,
        required: true
      },
      vert_end: {
        number: true,
        min: -50,
        max: 50,
        required: true
      }
    },

    // error messages
    messages: {
      horiz_start: {
        number: "error invalid number.<br/>Please enter a number between -50 and 50",
        min: "number entered is too small.<br/>Please enter a number between -50 and 50",
        max: "number entered is too large.<br/>Please enter a number between -50 and 50",
        required: "no number input.<br/>Please enter a number between -50 and 50"
      },
      horiz_end: {
        number: "error invalid number.<br/>Please enter a number between -50 and 50",
        min: "number entered is too small.<br/>Please enter a number between -50 and 50",
        max: "number entered is too large.<br/>Please enter a number between -50 and 50",
        required: "no number input.<br/>Please enter a number between -50 and 50"
      },
      vert_start: {
        number: "error invalid number.<br/>Please enter a number between -50 and 50",
        min: "number entered is too small.<br/>Please enter a number between -50 and 50",
        max: "number entered is too large.<br/>Please enter a number between -50 and 50",
        required: "no number input.<br/>Please enter a number between -50 and 50"
      },
      vert_end: {
        number: "error invalid number.<br/>Please enter a number between -50 and 50",
        min: "number entered is too small.<br/>Please enter a number between -50 and 50",
        max: "number entered is too large.<br/>Please enter a number between -50 and 50",
        required: "no number input.<br/>Please enter a number between -50 and 50"
      }
    },

    // valid form
    submitHandler: function() {
      table_calc();
      return false;
    },

    invalidHandler: function() {
      // clear
      $("#warning_msg").empty();
      $("#multiplication_table").empty();
    },

    // URL: https://stackoverflow.com/questions/3691743/jquery-validate-how-to-keep-error-messages-from-altering-the-form-disposition
    errorElement: "div",
    errorPlacement: function(error, element) {
      error.insertAfter(element);
    },

    onkeyup: function( element, event ) {
      // Call the auto submit function on keyup, so the user does not have to
      // press the enter button.
      auto_submit();
    }
  });
}

// calculates the table
function table_calc() {
  /*
      User input
      http://www.w3schools.com/js/js_comparisons.asp
  */
  var hor_start = Number(document.getElementById('horiz_start').value);
  var hor_end = Number(document.getElementById('horiz_end').value);
  var vert_start = Number(document.getElementById('vert_start').value);
  var vert_end = Number(document.getElementById('vert_end').value);

  //clear
  $("#warning_msg").empty();

  // Swap beginning / ending numbers if the start is larger than the beginning.
  if (hor_start > hor_end) {
    var tmp_num = hor_start;
    hor_start = hor_end;
    hor_end = tmp_num;
  }

  // Also swap vertical beginning / ending
  if (vert_start > vert_end) {
    var tmp_num = vert_start;
    vert_start = vert_end;
    vert_end = tmp_num;
  }

  var matrix = {};

  // calculate rows and columns
  var rows = Math.abs(hor_end - hor_start);
  var columns = Math.abs(vert_end - vert_start);

  // Indexes for the 2D array.
  var horz = hor_start;
  var vert = vert_start;

  //  Calculate the multiplication table

    for (var x = 0; x <= columns; x++) {
    var tmp_arr = [];
    for (var y = 0; y <= rows; y++) {
      var calc = horz * vert;
      tmp_arr[y] = calc;
      horz++;
    }

    // Save
    matrix["row" + x] = tmp_arr;
    horz = hor_start;        // Reset each pass
    vert++;
  }


  // w3schools is helpful: http://www.w3schools.com/html/html_tables.asp
  // fill in the table
  var content = "";
  content += "<table>";
  content += "<tr><td></td>";

  for (var a = hor_start; a <= hor_end; a++) {
    content += "<td>" + a + "</td>";
  }
  content += "</tr>";
  var vert = vert_start;
  for (var x = 0; x <= columns; x++) {
    content += "<tr><td>" + vert + "</td>";
    for (var y = 0; y <= rows; y++) {
      content += "<td>" + matrix["row" + x][y] + "</td>";
    }
    vert++;
    content += "</tr>";
  }
  content += "</table>";

  // load
  $("#multiplication_table").html(content);
  return false;
}
