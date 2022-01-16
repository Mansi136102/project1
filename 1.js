$(function() {
    // Initialise the inputs on page load:
    var today = new Date().toJSON().replace(/..(..)-(..)-(..).*/, '$2/$3/$1');
    $("#selectDate").datepicker({
      dateFormat: 'mm/dd/yy'
    }).val(today).change(applyFilter);
    $("#selectDate2").datepicker({
      dateFormat: 'mm/dd/yy'
    }).val(today).change(applyFilter);
    $("#rangeval").change(applyFilter);
  
    $.fn.date = function() {
      return new Date((this.is(':input') ? this.val() : this.text()).replace(/\/(..)$/, '/20$1'));
    }
  
    function applyFilter() {
      var filterType = $("#rangeval").val(),
        start, end;
      // Set the visibility of the two date fields:
      $("#selectDate").toggle(["Single Date", "Custom Date Range"].indexOf(filterType) > -1);
      $("#selectDate2").toggle(filterType === "Custom Date Range");
      // Depending on the type of filter, set the range of dates (start, end):
      if (filterType === "") {
        // Show all: choose extreme dates
        start = new Date('1000-01-01');
        end = new Date('3000-01-01');
      } else if (!parseInt(filterType)) {
        // Use data entry:
        start = $("#selectDate").date();
        end = filterType === "Custom Date Range" ? $("#selectDate2").date() : start;
      } else {
        // Show last X days:
        start = new Date();
        start.setHours(0, 0, 0, 0);
        start.setDate(start.getDate() - parseInt(filterType));
        end = new Date(); // today
      }
      // For each row: set the visibility depending on the date range
      $(".mainBody tr").each(function() {
        var date = $("td:last-child", this).date();
        $(this).toggle(date >= start && date <= end);
      });
    }
    applyFilter(); // Execute also on page load
  });