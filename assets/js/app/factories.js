/*
 * Copyright (C) 2014 TopCoder Inc., All Rights Reserved.
 */

'use strict';

var angular = require('angular');
var _ = require('lodash');

module.exports = angular.module('broker.factories', [])
  .factory('ApiResource', [function() {

    // @todo Move this to it's own JSON file.
    var jsonRoutes = {
      //'basePath': 'http://localhost:5000/api',
      'basePath': '/api',
      'routes': {
        'solutions':         '/solutions/:id',
        'projectValues':     '/projectValues',
        'manageValues':      '/manageValues',
        'marketplaceValues': '/marketplaceValues',
        'alerts':            '/alerts',
        'alertPopup':        '/alertPopup',
        'usersById':         '/users/:id',
        'recentUsers':       '/users/recent',
        'ordersById':        '/orders/:id',
        'recentOrders':      '/orders/recent',
        'projectsById':      '/projects/:id',
        'servicesById':      '/services/:id',
        'applicationsById':  '/applications/:id',
        'bundlesById':       '/bundles/:id',
        'header':            '/header',
        'signIn':            '/staff/sign_in',
        'signOut':           '/staff/sign_out'
      }
    };

    return function(apiResourceKey) {
      if (_.isEmpty(apiResourceKey)) {
        return jsonRoutes.basePath;
      }
      return jsonRoutes.basePath + jsonRoutes.routes[apiResourceKey];
    };
  }])
  // resource for Solution
  .factory('Solution', ['$resource', 'ApiResource', function($resource, ApiResource) {
    return $resource(ApiResource('solutions'));
  }])
  // resource for general data
  .factory('DataService', ['$resource', 'ApiResource', function($resource, ApiResource) {
    return $resource(ApiResource(), {}, {
      getProjectValues: {
        method: "GET",
        url: ApiResource('projectValues')
      },
      getManageValues: {
        method: "GET",
        url: ApiResource('manageValues')
      },
      getMarketplaceValues: {
        method: "GET",
        url: ApiResource('marketplaceValues')
      },
      getAlerts: {
        method: "GET",
        isArray: true,
        url: ApiResource('alerts')
      },
      getAlertPopup: {
        method: "GET",
        url: ApiResource('alertPopup')
      }
    });
  }])
  // resource for User
  .factory('User', ['$resource', 'ApiResource', function($resource, ApiResource) {
    return $resource(ApiResource('usersById'), {}, {
      getRecentUsers: {
        method: "GET",
        isArray: true,
        url: ApiResource('recentUsers')
      }
    });
  }])
  // resource for Order
  .factory('Order', ['$resource', 'ApiResource', function($resource, ApiResource) {
    return $resource(ApiResource('ordersById'), {}, {
      getRecentOrders: {
        method: "GET",
        isArray: true,
        url: ApiResource('recentOrders')
      }
    });
  }])
  // resource for Project
  .factory('Project', ['$resource', 'ApiResource', function($resource, ApiResource) {
    return $resource(ApiResource('projectsById'));
  }])
  // resource for Service
  .factory('Service', ['$resource', 'ApiResource', function($resource, ApiResource) {
    return $resource(ApiResource('servicesById'));
  }])
  // resource for Application
  .factory('Application', ['$resource', 'ApiResource', function($resource, ApiResource) {
    return $resource(ApiResource('applicationsById'));
  }])
  // resource for Bundle
  .factory('Bundle', ['$resource', 'ApiResource', function($resource, ApiResource) {
    return $resource(ApiResource('bundlesById'));
  }])
  // resource for data displayed in header (notifications and basket count)
  .factory('HeaderData', ['$resource', 'ApiResource', function($resource, ApiResource) {
    return $resource(ApiResource('header'));
  }])
  // fix sidebar height
  .factory('fixSidebar', [function() {
    return function() {
      var $nav = $('.side-nav');
      $nav.height(500);

      var headerAndFooterHeight = $('header').outerHeight() + $('footer').outerHeight();
      var mainContentEl = $('.main-content');

      if ((mainContentEl.height() + headerAndFooterHeight) < document.documentElement.clientHeight) {
        $nav.height(document.documentElement.clientHeight - headerAndFooterHeight);
      } else {
        $nav.height(mainContentEl.height());
      }
    };
  }])
  .factory('httpInterceptor', function httpInterceptor ($q, $window, AuthService) {
    return function (promise) {
        var success = function (response) {
            return response;
        };

        var error = function (response) {
            if (response.status === 401) {
                AuthService.logout();
            }

            return $q.reject(response);
        };

        return promise.then(success, error);
    };
  })
  .factory('AuthService', function ($http, $location, Session, ApiResource, USER_ROLES) {
    var authService = {};

    authService.login = function (credentials) {
      return $http
        .post(ApiResource('signIn'), credentials)
        .success(function (data, statusCode) {
          Session.create(data.email, data.role);
        })
        .error(function() {
          // Do error here.
        })
    };

    authService.logout = function() {
      Session.destroy();
      $location.path('/');
    };

    // @todo Need to check the cookie here and then regrab the session data.
    authService.isAuthenticated = function () {
      return !!Session.email;
    };

    authService.isAuthorized = function (authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }

      // If authorizedRoles contains 'all', then we allow it through.
      if (authorizedRoles.indexOf(USER_ROLES.all) !== -1) {
        return true;
      } else {
        return (authService.isAuthenticated() && authorizedRoles.indexOf(Session.role) !== -1);
      }
    };

    return authService;
  })
  .service('Session', function () {
    this.create = function (email, role) {
      this.email = email;
      this.role = role;
    };
    this.destroy = function () {
      this.email = null;
      this.role = null;
    };
    return this;
  });