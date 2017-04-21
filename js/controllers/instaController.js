(function() {
    'use strict';
    angular
        .module('insta', [])
        .controller('instaController', function(API, $scope) {

        	const vm = this;

            $scope.isLiked = false;
            $scope.like = function(){
                $scope.isLiked = !$scope.isLiked
            }

            //load images on start up
			let images = API.getImages();
            images.then(response => {
                vm.images = response.data.images;
                console.log(vm.images);
            })

            //function to add an image
            vm.addImage = function(valid){
                if(valid){
                    let image = vm.image;
                    let newImage = Object.assign({}, image);
                    console.log(newImage);
                    let addNewImage = API.addImage(newImage);
                    addNewImage.then(res =>{
                        console.log(res);
                        vm.images = res;
                        console.log(vm.images);
                    })
                    vm.image = {};
                }
            }

            vm.oneImage = function(id){
                let singleImage = API.getSingleImage(id);
                singleImage.then(res => {
                    console.log(res);
                    vm.anImage = res.data;
                    vm.singleImage = [vm.anImage];
                    console.log(vm.singleImage);
                })
            }

            //fuction to like an image
            vm.like = function(id){
                vm.liked = false;
                if(vm.liked === false){
                    let like = API.likeImage(id);
                    like.then(res => {
                        console.log(res);
                        console.log(vm.images);
                    })
                    vm.liked = true;
                } else {
                    vm.liked = false;
                }
            }
        });
})();