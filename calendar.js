function CalendarController($scope) {
  $scope.monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  $scope.search = {
    startDate: new Date('2017/07/23'),
    days: 2,
    countrycode: 'US'
  };

  $scope.buildCalendar = function() {
    $scope.calendar = [];

    var startDate = new Date($scope.search.startDate);
    var days = $scope.search.days;

    var widgets = retrieveWidgets(
      startDate,
      addDays(new Date($scope.search.startDate), days)
    );

    for (var i = 0; i < widgets; i++) {
      var currentDate = new Date(startDate);
      currentDate = new Date(currentDate.setMonth(+currentDate.getMonth() + i));

      var test = getDaysInMonth(currentDate, days);
      days -= test.amountDaysGenerated;

      var widget = {
        monthHeader: `${$scope.monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`,
        daysHeader: $scope.daysHeader,
        days: []
      }

      $scope.calendar.push(widget);
    }
  };

  function retrieveWidgets(d1, d2) {
    var months;

    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();


    return months < 0 ? 1 : (months + 2);
  }

  function getDaysInMonth(date, days) {
    if (days < 1) {
      return;
    }

    var lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    var remainingDays = lastDate.getDate() - date.getDate();
    var amountDaysGenerated = 0;

    while (remainingDays > 0) {
      remainingDays--;
      amountDaysGenerated++;

      if (amountDaysGenerated === days) {
        break;
      }
    }

    days -= amountDaysGenerated;

    return {
      firstDay: date.getDate(),
      amountDaysGenerated: amountDaysGenerated
    }
  }

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(+result.getDate() + days);
    return result;
  }

  $scope.daysHeader = [{
    label: 'S',
    value: 0
  }, {
    label: 'M',
    value: 1
  }, {
    label: 'T',
    value: 2
  }, {
    label: 'W',
    value: 3
  }, {
    label: 'T',
    value: 4
  }, {
    label: 'F',
    value: 5
  }, {
    label: 'S',
    value: 6
  }];
}

CalendarController.$inject = ['$scope'];
angular.module('calendarApp', []).controller('calendarController', CalendarController);
