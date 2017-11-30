angular.module('product', [])
    .controller('MainCtrl', [
  '$scope', '$http',
  function ($scope, $http) {
            $scope.products = [];
            $scope.cart = [];

            $scope.dopurchase = function () {
                console.log("In Dopurchase");
                angular.forEach($scope.products, function (value, key) {
                    if (value.selected) {
                        $scope.purchase(value);
                        $scope.cart.push(value);
                    }
                });
            }

            $scope.incrementPurchases = function (product) {
                console.log("incrementing purchases!");
                $scope.purchase(product);
            };

            $scope.getAll = function () {
                return $http.get('/products').success(function (data) {
                    angular.copy(data, $scope.products);
                });
            };
            $scope.getAll();

            $scope.create = function (product) {
                return $http.post('/products', product).success(function (data) {
                    $scope.products.push(data);
                });
            };

            $scope.purchase = function (product) {
                return $http.put('/products/' + product._id + '/purchase')
                    .success(function (data) {
                        console.log("purchase worked");
                        product.purchases += 1;
                    });
            };
      
            $scope.addProduct = function () {
                $scope.create({
                    title: $scope.prodName,
                    price: $scope.prodPrice,
                    URL: $scope.prodURL,
                    purchases: 0
                });
                $scope.prodName = '';
                $scope.prodPrice = '';
                $scope.prodURL = '';  
            };

            $scope.delete = function (product) {
                $http.delete('/products/' + product._id)
                    .success(function (data) {
                        console.log("delete worked");
                    });
                $scope.getAll();
            };
  }
]);
