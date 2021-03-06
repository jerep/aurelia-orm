var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

import { bindingMode } from 'aurelia-binding';
import { bindable, customElement } from 'aurelia-templating';

export let Paged = (_dec = customElement('paged'), _dec2 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec3 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec(_class = (_class2 = class Paged {
  constructor() {
    _initDefineProp(this, 'data', _descriptor, this);

    _initDefineProp(this, 'page', _descriptor2, this);

    _initDefineProp(this, 'criteria', _descriptor3, this);

    _initDefineProp(this, 'resource', _descriptor4, this);

    _initDefineProp(this, 'limit', _descriptor5, this);
  }

  attached() {
    if (!this.page) {
      this.page = 1;
    }

    if (!this.criteria) {
      this.criteria = {};
    }

    this.reloadData();
  }

  reloadData() {
    this.getData();
  }

  isChanged(newVal, oldVal) {
    return !this.resource || !newVal || newVal === oldVal;
  }

  pageChanged(newVal, oldVal) {
    if (this.isChanged(newVal, oldVal)) {
      return;
    }

    this.reloadData();
  }

  criteriaChanged(newVal, oldVal) {
    if (this.isChanged(newVal, oldVal)) {
      return;
    }

    this.reloadData();
  }

  getData() {
    this.criteria.skip = this.page * this.limit - this.limit;
    this.criteria.limit = this.limit;

    this.resource.find(this.criteria, true).then(result => {
      this.data = result;
    }).catch(error => {
      console.error('Something went wrong.', error);
    });
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'data', [_dec2], {
  enumerable: true,
  initializer: function () {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'page', [_dec3], {
  enumerable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'criteria', [bindable], {
  enumerable: true,
  initializer: function () {
    return {};
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'resource', [bindable], {
  enumerable: true,
  initializer: function () {
    return null;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'limit', [bindable], {
  enumerable: true,
  initializer: function () {
    return 30;
  }
})), _class2)) || _class);