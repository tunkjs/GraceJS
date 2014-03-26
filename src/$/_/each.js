

var each = _.each = function (obj, iterator, context) {
		if (obj == null)
			return;
		if (obj.length === +obj.length) {
			for (var i = 0, l = obj.length; i < l; i++) {
				if (iterator.call(context, obj[i], i, obj) === breaker)
					return;
			}
		} else {
			for (var key in obj) {
				if (_.hasKey(obj, key)) {
					if (iterator.call(context, obj[key], key, obj) === breaker)
						return;
				}
			}
		}
	};
