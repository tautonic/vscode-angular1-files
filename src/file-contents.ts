import { IConfig } from './models/config';
export class FileContents {

  private camelCase(input: string): string {
    return input.replace(/-([a-z])/ig, function (all, letter) {
      return letter.toUpperCase();
    });
  }
  
  public moduleContent(inputName: string, inputNameUpperCase: string, config: IConfig): string {
    const content: string = `
(function() {
  'use strict';

  angular.module('app.${inputName}', [
    'app.core',
    'app.widgets'
  ]);
})();`;
    return content;
  }

  public moduleCSSContent(inputName: string, inputNameUpperCase: string, config: IConfig): string {
    var componentContent: string = `
.fa-${inputName} {

}`;
    return componentContent;
  }

  public componentHTMLContent(inputName: string, inputNameUpperCase: string, config: IConfig): string {
    var componentContent: string = `<p>
  ${inputName} works!
</p>`;
    return componentContent;
  }

  public controllerContent(inputName: string, inputNameUpperCase: string, config: IConfig): string {
    var content: string = `
(function () {
  'use strict';

  angular
    .module('app.${inputName}')
    .controller('${inputNameUpperCase}Controller', ${inputNameUpperCase}Controller);

  ${inputNameUpperCase}Controller.$inject = ['logger'];

  /* @ngInject */
  function ${inputNameUpperCase}Controller(logger) {
    var vm = this;
    vm.title = '${inputNameUpperCase}';

    activate();

    ////////////////

    function activate() {
      logger.info('Activated ${inputNameUpperCase} View');
      //start writing code here

    }
  }

})();`;
    return content;
  }

  public controllerTestContent(inputName: string, inputNameUpperCase: string, config: IConfig): string {
    var content: string = `
/* jshint -W117, -W030 */
describe('${inputNameUpperCase}Controller', function() {
  var controller;

  beforeEach(function() {
    bard.appModule('app.${inputName}');
    bard.inject('$controller', '$log', '$rootScope');
  });

  beforeEach(function() {
    controller = $controller('${inputNameUpperCase}Controller');
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('${inputNameUpperCase} controller', function() {
    it('should be created successfully', function() {
      expect(controller).to.be.defined;
    });

    describe('after activate', function() {
      it('should have title of ${inputNameUpperCase}', function() {
        expect(controller.title).to.equal('${inputNameUpperCase}');
      });

      it('should have logged "Activated"', function() {
        expect($log.info.logs).to.match(/Activated/);
      });
    });
  });
});`;
    return content;
  }

  public routeContent(inputName: string, inputNameUpperCase: string, config: IConfig): string {
    var content: string = `
(function() {
  'use strict';

  angular
    .module('app.${inputName}')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: '${inputName}',
        config: {
          url: '/',
          templateUrl: 'app/${inputName}/${inputName}.html',
          controller: '${inputNameUpperCase}Controller',
          controllerAs: 'vm',
          title: '${inputName}',
          settings: {
            nav: 1,
            content: '<i class="fa fa-${inputName}"></i> ${inputNameUpperCase}'
          }
        }
      }
    ];
  }
})();`;
    return content;
  }

  public routeTestContent(inputName: string, inputNameUpperCase: string, config: IConfig): string {
    var content: string = `
/* jshint -W117, -W030 */
describe('${inputName} routes', function() {
  describe('state', function() {
    var view = 'app/${inputName}/${inputName}.html';

    beforeEach(function() {
      module('app.${inputName}', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function() {
      $templateCache.put(view, '');
    });

    bard.verifyNoOutstandingHttpRequests();

    it('should map state ${inputName} to url / ', function() {
      expect($state.href('${inputName}', {})).to.equal('/');
    });

    it('should map /${inputName} route to ${inputName} View template', function() {
      expect($state.get('${inputName}').templateUrl).to.equal(view);
    });

    it('of ${inputName} should work with $state.go', function() {
      $state.go('${inputName}');
      $rootScope.$apply();
      expect($state.is('${inputName}'));
    });
  });
});`;
    return content;
  }

  public serviceContent(inputName: string, dirName: string, config: IConfig): string {
    const content: string = `
(function() {
  'use strict';

  angular
    .module('app.${dirName}')
    .factory('${inputName}', ${inputName});

  ${inputName}.$inject = ['$q', 'logger'];
  /* @ngInject */
  function ${inputName}($q, logger) {
    var service = {
      getServiceName: getServiceName
    };

    return service;

    function getServiceName() {
      return $q.when('${inputName}');
    }
  }
})();`;
    return content;
  }

  public serviceTestContent(inputName: string, dirName: string, config: IConfig): string {
    const content: string = `
/* jshint -W117, -W030 */
describe('${inputName}', function() {
  var ${inputName};
  var mocks = {
    testErrorMessage: 'testErrorMessage'
  };

  beforeEach(function() {
    bard.appModule('app.${dirName}', function(_${inputName}_) {
      ${inputName} = _${inputName}_;
    });
    bard.inject('$rootScope');
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('${inputName}', function() {
    it('should have a dummy test', inject(function() {
      expect(true).to.equal(true);
    }));

    it('should have ${inputName} defined', inject(function() {
      expect(${inputName}).to.be.defined;
    }));

    describe('with appErrorPrefix', function() {
      beforeEach(function() {
        //test setup routine

      });

      it('should have some behavior', inject(function() {
        expect('some behavior').to.be.defined;
      }));

      it('should have some property equal to true', inject(function() {
        expect(true)
          .to.equal(true);
      }));

      it('should throw an error when forced', inject(function() {
        expect(functionThatWillThrow).to.throw();
      }));

    });
  });

  function functionThatWillThrow() {
    throw new Error(mocks.testErrorMessage);
  }
});`;
    return content;
  }


  public directiveContent(inputName: string, inputNameUpperCase: string, dirName: string, 
      config: IConfig): string {
    const upperName = this.toUpperCase(inputName);

    const content: string = `
(function() {
  'use strict';

  angular
    .module('app.${dirName}')
    .directive('${inputNameUpperCase}', ${inputNameUpperCase});

  /* @ngInject */
  function ${inputNameUpperCase}() {
    //Usage:
    //<div ${inputName} title="vm.map.title"></div>
    // Creates:
    // <div ${inputName}=""
    //      title="????"
    //      allow-collapse="true" </div>
    var directive = {
      scope: {
        'title': '@',
        'subtitle': '@',
        'rightText': '@',
        'allowSomething': '@'
      },
      templateUrl: 'app/${dirName}/${inputName}.html',
      restrict: 'EA',
      link: link
    };
    return directive;

    function link(scope, element, attr) {
      scope.doSomething = function() {
        if (scope.allowSomething === 'true') {
          // var content = angular.element(element);
          // content.doSomething();
        }
      };
    }
  }
})();`;
    return content;
  }

  public directiveHtml(inputName: string, inputNameUpperCase: string, dirName: string,
      config: IConfig): string {
    const upperName = this.toUpperCase(inputName);

    const content: string = `
<div class="widget-head" ng-class="{'someProperty': allowSomething === 'true'}" ng-click="doSomething()">
  <div class="page-title pull-left">{{title}}</div>
  <small class="page-title-subtle" ng-show="subtitle">({{subtitle}})</small>
  <div class="widget-icons pull-right"></div>
  <small class="pull-right page-title-subtle" ng-show="rightText">{{rightText}}</small>
  <div class="clearfix"></div>
</div>`;
    return content;
  }

  public directiveTestContent(inputName: string, inputNameUpperCase: string, dirName: string, config: IConfig): string {
    const upperName = this.toUpperCase(inputName);

    const content: string = `
/* jshint -W117, -W030 */
describe('${inputName}.directive', function() {
  var el;
  var someClass = 'someClass';
  
  beforeEach(module('app.${dirName}'));

  beforeEach(inject(function($compile, $rootScope) {
    el = angular.element(
      '<directive-tag>' +
      '</directive-tag>');
    
    scope = $rootScope;
    $compile(el)(scope);

    // tell angular to look at the scope values right now
    scope.$digest();
  }));

  bard.verifyNoOutstandingHttpRequests();

  describe('${inputName}.directive controller', function() {
    it('should behave a certain way', function() {
      var hasClass = el.hasClass(someClass);
      expect(hasClass).to.equal(false);
    });
  });
});`;
    return content;
  }

  private toUpperCase(input: string): string {
    let inputNameUpperCase: string;
    inputNameUpperCase = input.charAt(0).toUpperCase() + input.slice(1);
    inputNameUpperCase = this.camelCase(inputNameUpperCase);

    return inputNameUpperCase;
  }
}