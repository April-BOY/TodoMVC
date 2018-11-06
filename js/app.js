(function(window) {
	'use strict';

	// Your starting point. Enjoy the ride!
	/**
	 * 展示数据
	 * 删除任务数据
	 * 添加任务数据
	 * 编辑任务数据
	 * 切换任务完成的状态 #体现了双向数据绑定的思想
	 * 批量切换任务状态
	 * 清除已完成的任务
	 * 注意：隐藏或显示清除按钮
	 * 显示未完成任务数
	 * 切换不同任务的显示 #这个需求比较难，需要监听地址栏
	 * 同步本地存储
	 */
	new Vue({
		/**
		 * el:'.todoapp' 指定的容器内添加的事件都可以监听到。
		 * 如果在 methods 添加的监听事件的标签不在 todoapp 的容器内，则无法监听到该事件的执行。
		 * 即添加的事件无效
		 */
		el: '.todoapp',
		data: {
      /**
       * @param {String} newTask 输入框的内容一开始为空，所以，newTask 是空字符串
       * @param {String} isEditing 一开始每项内容都是不可编辑状态，因为是否可编辑
       *                 是通过与 tasks 数组的索引进行比较得出的，与索引号相等则可编辑，
       *                 反之则不行。所以，设置为 -1 就是不相等，处于不可编辑状态
       */
			newTask: "",
			isEditing: -1,
			tasks: [{
					id: 0,
					name: "吃饭",
					completed: true
				},
				{
					id: 1,
					name: "学习",
					completed: false
				},
				{
					id: 3,
					name: "玩游戏",
					completed: false
				}
			]
		},
		methods: {
			// 删除任务数据
			/**
			 * 删除任务数据，就是删除从后台渲染到页面上的数据，而不必纠结于删除页面上的 html 标签(只需要关心数据，而不必考虑视图)。
			 * 这样思考的话，就错了。
			 */
			del: function(id) {
				for (let i = 0; i < this.tasks.length; i++) {
					let task = this.tasks[i];
					if (task.id == id) {
						this.tasks.splice(i, 1);
						return;
					}
				}
			},
			// 添加任务数据
			add: function() {
				console.log(1)
				if (!this.newTask) {
					return;
				}
				let id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 0;
				this.tasks.push({
					id,
					/**
           * 因为 v-model 的作用是创建双向数据绑定，即视图上表单的内容发生变化，
           * 后台的数据也变化。后台的数据发生变化，视图上表单的内容也会改变。
           * 因此，可以通过 v-model 进行表单数据的获取和更改
           * 通过 v-model 获取 newTask 的值
           */          
					name: this.newTask,
					completed: false
				});
				this.newTask = "";
			},
			// 编辑任务数据
			edit: function(index) {
				/**
				 * 通过给是否可以编辑任务数据设置一个开关，来判断编辑的状态。
				 * 开关的设置就通过数组的索引来设置
				 */
				this.isEditing = index;
			}
		}
	});
})(window);
