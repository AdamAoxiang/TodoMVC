(function(angular){

	angular
		.module('myApp.DataSrc',[])
		.service('DataService',['$window',function($window){
			var localStorage=$window.localStorage;
			var dataStr=localStorage.getItem('todo');
			var taskList=JSON.parse(dataStr)||[];
			this.taskList=taskList;
			this.getData=function(){
				return this.taskList;
			}



		}])


})(angular)