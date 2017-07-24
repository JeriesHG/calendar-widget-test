function CalendarController($scope) {
  $scope.monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];


  $scope.calendar = [];
  $scope.search = {
    startDate: new Date('2017/07/23'),
    days: 2,
    countrycode: 'US'
  };

  $scope.buildCalendar = function() {
    var startDate = new Date($scope.search.startDate);
    var widgets = retrieveWidgets(
      startDate,
      addDays(new Date($scope.search.startDate), $scope.search.days)
    );

    for (var i = 0; i < widgets; i++) {
      var currentMonth = new Date(startDate.setMonth(+startDate.getMonth() + i));
      var widget = {
        monthHeader: `${$scope.monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`,
        daysHeader: $scope.daysHeader,
        days: []
      }

      $scope.calendar.push(widget);
    }

    console.log($scope.calendar);
  };

  function retrieveWidgets(d1, d2) {
    var months;

    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();


    return months < 0 ? 1 : (months + 2);
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
