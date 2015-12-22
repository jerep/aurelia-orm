System.register(['aurelia-framework', 'aurelia-binding', 'aurelia-templating', '../index', 'extend'], function (_export) {
  'use strict';

  var bindable, inject, bindingMode, BindingEngine, customElement, EntityManager, OrmMetadata, extend, AssociationSelect;

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

  return {
    setters: [function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
      inject = _aureliaFramework.inject;
    }, function (_aureliaBinding) {
      bindingMode = _aureliaBinding.bindingMode;
      BindingEngine = _aureliaBinding.BindingEngine;
    }, function (_aureliaTemplating) {
      customElement = _aureliaTemplating.customElement;
    }, function (_index) {
      EntityManager = _index.EntityManager;
      OrmMetadata = _index.OrmMetadata;
    }, function (_extend) {
      extend = _extend['default'];
    }],
    execute: function () {
      AssociationSelect = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(AssociationSelect, [{
          key: 'criteria',
          decorators: [bindable],
          initializer: function initializer() {
            return null;
          },
          enumerable: true
        }, {
          key: 'repository',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }, {
          key: 'property',
          decorators: [bindable],
          initializer: function initializer() {
            return 'name';
          },
          enumerable: true
        }, {
          key: 'options',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }, {
          key: 'association',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }, {
          key: 'manyAssociation',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }, {
          key: 'value',
          decorators: [bindable({ defaultBindingMode: bindingMode.twoWay })],
          initializer: null,
          enumerable: true
        }], null, _instanceInitializers);

        function AssociationSelect(bindingEngine, entityManager) {
          _classCallCheck(this, _AssociationSelect);

          _defineDecoratedPropertyDescriptor(this, 'criteria', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'repository', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'property', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'options', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'association', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'manyAssociation', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'value', _instanceInitializers);

          this._subscriptions = [];
          this.bindingEngine = bindingEngine;
          this.entityManager = entityManager;
        }

        _createDecoratedClass(AssociationSelect, [{
          key: 'load',
          value: function load() {
            var _this = this;

            this.buildFind().then(function (options) {
              var result = options;
              _this.options = Array.isArray(result) ? result : [result];
            });
          }
        }, {
          key: 'getCriteria',
          value: function getCriteria() {
            if (typeof this.criteria !== 'object') {
              return {};
            }

            return extend(true, {}, this.criteria);
          }
        }, {
          key: 'buildFind',
          value: function buildFind() {
            var _this2 = this;

            var repository = this.repository;
            var criteria = this.getCriteria();
            var findPath = repository.getResource();

            if (this.manyAssociation) {
              var assoc = this.manyAssociation;

              var property = this.propertyForResource(assoc.getMeta(), repository.getResource());
              findPath = assoc.getResource() + '/' + assoc.id + '/' + property;
            } else if (this.association) {
              var associations = Array.isArray(this.association) ? this.association : [this.association];

              associations.forEach(function (association) {
                criteria[_this2.propertyForResource(_this2.ownMeta, association.getResource())] = association.id;
              });
            } else {
              criteria.populate = false;
            }

            return repository.findPath(findPath, criteria);
          }
        }, {
          key: 'verifyAssociationValues',
          value: function verifyAssociationValues() {
            if (this.manyAssociation) {
              return !!this.manyAssociation.id;
            }

            if (this.association) {
              var associations = Array.isArray(this.association) ? this.association : [this.association];

              return !associations.some(function (association) {
                return !association.id;
              });
            }

            return true;
          }
        }, {
          key: 'observe',
          value: function observe(association) {
            var _this3 = this;

            if (Array.isArray(association)) {
              association.forEach(function (assoc) {
                return _this3.observe(assoc);
              });

              return this;
            }

            this._subscriptions.push(this.bindingEngine.propertyObserver(association, 'id').subscribe(function () {
              if (_this3.verifyAssociationValues()) {
                return _this3.load();
              }

              _this3.options = undefined;
            }));

            return this;
          }
        }, {
          key: 'attached',
          value: function attached() {
            if (!this.association && !this.manyAssociation) {
              this.load();

              return;
            }

            this.ownMeta = OrmMetadata.forTarget(this.entityManager.resolveEntityReference(this.repository.getResource()));

            if (this.manyAssociation) {
              this.observe(this.manyAssociation);
            }

            if (this.association) {
              this.observe(this.association);
            }
          }
        }, {
          key: 'propertyForResource',
          value: function propertyForResource(meta, resource) {
            var associations = meta.fetch('associations');

            return Object.keys(associations).filter(function (key) {
              return associations[key] === resource;
            })[0];
          }
        }, {
          key: 'unbind',
          value: function unbind() {
            this._subscriptions.forEach(function (subscription) {
              return subscription.dispose();
            });
          }
        }], null, _instanceInitializers);

        var _AssociationSelect = AssociationSelect;
        AssociationSelect = inject(BindingEngine, EntityManager)(AssociationSelect) || AssociationSelect;
        AssociationSelect = customElement('association-select')(AssociationSelect) || AssociationSelect;
        return AssociationSelect;
      })();

      _export('AssociationSelect', AssociationSelect);
    }
  };
});