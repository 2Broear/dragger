'use strict';
const dragger = {
    dom: {
        elements: [{
            style: document.createElement('STYLE'),
        }],
        initiate: ()=> {
            const _d = dragger,
                  _s = _d.init?._conf,
                  _m = _d.mod.methods,
                  _e = _d.dom.elements,
                  sty = _e[0].style,
                  cls = _s.class;
            // load css style
            sty.textContent = `html,body{overflow:hidden;}.${cls.wrap}{white-space:nowrap;max-width:360px;position:relative;/*margin:15% auto;*/}.${cls.wrap} .${cls.list}{text-align:center;}.${cls.wrap} ul ol,.${cls.wrap} ol ul,.${cls.wrap} ol ol,.${cls.wrap} ul ul{width:100%;font-size:small;display:block;margin:auto auto 10px;box-sizing:border-box;}.${cls.wrap} ul,.${cls.wrap} ol{width:35%;padding:15px;margin:auto 10px auto auto;list-style-type:none;display:inline-block;border:1px solid lightgrey;border-radius:5px;vertical-align:top;position:relative;cursor:move;box-sizing:border-box;transition:all .35s ease;}.${cls.wrap} li.${cls.dropBefore},.${cls.wrap} li.${cls.dropAfter},.${cls.wrap} li.${cls.press},.${cls.wrap} li:hover{color:dodgerblue;border-color:currentColor;}.${cls.wrap} li:last-child,.${cls.wrap} .${cls.list}:last-child{margin:auto;}.${cls.wrap} .${cls.press}{opacity:.5;z-index:1;/*border:1px outset currentColor;*/}.${cls.wrap} ol::after,.${cls.wrap} ul::after,.${cls.wrap} li.${cls.dropBefore}::after,.${cls.wrap} li.${cls.dropAfter}::after{content:'+';color:darkgrey;font-size:22px;display:block;border-radius:inherit;height:0;opacity:0;transition:all .15s linear;}.${cls.wrap} li.${cls.dropBefore}::after,.${cls.wrap} li.${cls.dropAfter}::after,.${cls.wrap} .${cls.enter}::after{height:30px;opacity:1;border:1px dashed;box-sizing:inherit;cursor:cell;}
               .${cls.wrap} .${cls.list}.${cls.dropBefore}::before,.${cls.wrap} .${cls.list}.${cls.dropAfter}::before{height:100%;opacity:1;height:var(--dragTargetHeight);}.${cls.wrap} .${cls.list}.${cls.dropBefore}::before{left:-100%;margin-left:-10%;}.${cls.wrap} .${cls.list}.${cls.dropAfter}::before{left:100%;margin-left:10%;}.${cls.wrap} ol.${cls.press}::before,.${cls.wrap} ul.${cls.press}::before{height:100%;z-index:1;}.${cls.wrap} ol::before,.${cls.wrap} ul::before{content:'';width:100%;height:0%;position:absolute;top:0;left:0;z-index:-1;border-radius:inherit;border:2px dashed lightgrey;box-sizing:border-box;opacity:0;}.${cls.wrap} .${cls.enter}::after{margin:10px auto auto;}.${cls.wrap} li.${cls.dropAfter}::after,.${cls.wrap} li.${cls.dropBefore}::after{position:absolute;top:0;left:0;width:100%;}.${cls.wrap} li.${cls.dropBefore}:first-child{padding:40px 0 0;}.${cls.wrap} li.${cls.dropBefore}{padding:40px 0 0;}.${cls.wrap} ol.${cls.dropAfter}::before,.${cls.wrap} ul.${cls.dropAfter}::before,.${cls.wrap} .${cls.drop}::after/*,.${cls.wrap} .${cls.dropAfter}::after*/{height:0;opacity:0;margin:0;}.${cls.wrap} .${cls.dropBefore}::after,.${cls.wrap} .${cls.dropAfter}::after,.${cls.wrap} .${cls.drop}::after,.${cls.wrap} .${cls.drop} li,.${cls.wrap} .${cls.drop} li::after{transition:none;}.${cls.wrap} li.${cls.dropBefore}::before,.${cls.wrap} li.${cls.dropAfter}::before{content:"";width:100%;height:30px;border:1px solid;box-sizing:inherit;display:block;border-radius:inherit;position:absolute;}.${cls.wrap} li.${cls.dropAfter}::after{top:auto;bottom:0;}.${cls.wrap} li.${cls.dropBefore},.${cls.wrap} li.${cls.dropAfter}{border-color:transparent;}.${cls.wrap} li.${cls.dropAfter}{padding-bottom:40px;}.${cls.wrap} li{line-height:30px;border:inherit;border-radius:inherit;margin-bottom:10px;cursor:grab;background:white;position:relative;transition:transform,padding .15s ease-out;overflow:hidden;text-overflow:ellipsis;box-sizing:inherit;user-select:none;-webkit-user-select:none;}`;
            document.head.appendChild(sty);
            let ls = localStorage || window.localStorage,
                ls_cached = new RegExp(_s.static.dataPrefix+'\\d', 'g');
            // check if any saved data
            for(let i=0,lsl=ls.length;i<lsl;i++){
                if(ls_cached.test(ls.key(i))){
                    _s.static.dataStored = true;
                    break;
                }
            }
            let w_ = _s.element.wrap || document.createElement('DIV');
            w_.className = _s.class.wrap;
            if(_s.static.dataStored){  // load(sorted) data
                const sortedKeys = _m.sort_stored();
                for(let i=0,sl=sortedKeys.length;i<sl;i++){
                    w_.innerHTML += ls.getItem(sortedKeys[i]);
                }
                console.log('data loaded from (sorted)ls', sortedKeys);
            }else{  // create new data
                w_.appendChild(_m.init_list.apply(_s, ['OL', 2]));
                w_.appendChild(_m.init_list.apply(_s, ['UL', 2]));
                w_.appendChild(_m.init_list.apply(_s, ['OL', 1, 'test1']));
                w_.appendChild(_m.init_list.apply(_s, ['UL', 1, 'test2']));
                // save data
                _m.data_driven(w_.childNodes);
            }
            // insert dom
            _s.element.wrap = w_;
        },
    },
    mod: {
        _utils: {
            debouncer: (callback=false, delay=200)=> {
                var timer = null;
                return function(){
                    if(timer) clearTimeout(timer);
                    timer = setTimeout(function(){
                        callback.apply(this, arguments);
                    }, delay);
                }
            },
            throttler: (callback=false, delay=200)=> {
                let _closure = true;  //default running
                return function(){
                    if(!_closure) return;  //now running..
                    _closure = false;  //stop running
                    setTimeout(()=>{
                        callback.apply(this, arguments);
                        _closure = true;  //reset running
                    }, delay);
                };
            },
            preventDefault: (event)=> {
                if(event.preventDefault){
                    event.preventDefault();
                }else{
                    event.returnValue = false;
                }
            },
            getTarget: (event)=> {
                return event.target || window.srcElement;
            },
            getEvent: (event)=> {
                return event ? event : window.event;
            },
            addEvent: (element=null, type='', handler=false, cb=false)=> {
                if(!element || !type) return;
                try {
                    if(!handler || typeof handler!=='function') throw new Error('callback err.');
                    // console.log(dragger.mod._utils.fun_validator(handler));
                    switch (true) {
                        case element.addEventListener:
                            element.addEventListener(type, handler, cb);
                            break;
                        case element.attachEvent:
                            element.attachEvent('on'+type, handler);
                            break;
                        default:
                            element['on'+type] = handler;
                            break;
                    }
                } catch (error) {}
            },
            rand_number: function(min=1, max=10, includes=0, excludes=0) {  //randNumber(1,10, [3,5,7,9],[2,4,6,8])
                const randNum = Math.floor(Math.random()*(max-min+1))+min,
                      whitelist = includes && includes instanceof Array,
                      blacklist = excludes && excludes instanceof Array;
                if(blacklist){
                    if(excludes.indexOf(randNum)>-1){
                        console.debug('in blacklist, random init..', excludes);
                        return this.rand_number(min, max, includes, excludes);
                    }
                }
                if(whitelist){
                    if(includes.includes(randNum)){
                        return randNum;
                    }else{
                        //increasing probability (return whitelist+lastRandNum only, blacklist excluded)
                        includes.push(randNum); //neither black nor white list
                        let randInc = this.rand_number(0, includes.length-1);
                        console.debug('not whitelist:', randNum, ',reduce',includes, randInc)
                        //random whitelist
                        return includes[randInc];
                    }
                }
                return randNum;
            },
            args_rewriter: function(args={}, presets={}, callback=false) {
                try {
                    if(Object.prototype.toString.call(args)!=='[object Object]') throw new Error('invalid arguments provided!');
                    // rewrite conf
                    this.init.prototype._singleton_conf._rewriter(args, presets);
                    // callback returns
                    if(!this.mod._utils.fun_validator(callback)){
                        return args;
                    }
                    callback(args);
                } catch (error) {
                    console.log(error)
                }
            },
            coords_detector: function(e, t=null, topFn=false, bottomFn=false, leftFn=false, rightFn=false){
                e = this.getEvent(e);
                t = t || this.getTarget(e);
                const targetBound = t.getBoundingClientRect(),
                      targetWidth = t.offsetWidth,
                      targetHeight = t.offsetHeight,
                      clientX = e.clientX,
                      clientY = e.clientY,
                      onTop = clientY-targetBound.top < targetHeight/2, //onBottom = clientY-targetBound.top > targetHeight/2,
                      onLeft = clientX-targetBound.left < targetWidth/2; //onRight = clientX-targetBound.left > targetWidth/2,
                if(onTop){
                    this.fun_validator(topFn, true);
                    onLeft ? this.fun_validator(leftFn, true) : this.fun_validator(rightFn, true);
                }else{
                    this.fun_validator(bottomFn, true);
                    onLeft ? this.fun_validator(leftFn, true) : this.fun_validator(rightFn, true);
                }
            },
            parent_traversal: (t, p)=> {
                while (t && t.parentNode!==p) {
                    t = t.parentNode;
                }
                return t;
            },
            parent_finder: (t, c, f=false)=> {
                while(t!=this){
                    if(!t || !this) break;
                    if(t.classList && t.classList.contains(c)){
                        if(f && typeof(f) === 'function'){
                            f(t);
                        }else{
                            return t;
                        }
                        break;
                    }else{
                        t = t.parentNode;
                    }
                }
            },
            child_indexer: (child=null)=> {
                return Array.prototype.indexOf.call(child.parentNode.children, child);
            },
            num_validator: (number=0)=> {
                return !isNaN(number) && typeof number==='number';
            },
            fun_validator: (fn, exec=false)=> {
                if(!fn || typeof fn!=='function'){
                    return false;
                }
                return exec ? fn.apply(this.arguments) : true;
            },
        },
        methods: {
            init_list: function(tag='OL', count=1, text=''){
                const parent = document.createElement(tag),
                      fragment = document.createDocumentFragment();
                parent.classList.add(this.class.list);
                parent.draggable = true;
                for(let i=0;i<count;i++){
                    let child = document.createElement(this.static.listTag);
                    child.innerText = text || tag+i;
                    child.draggable = true;
                    fragment.appendChild(child);
                };
                parent.appendChild(fragment);
                return parent;
            },
            sort_stored: (ls=localStorage)=> {
                ls = ls ? ls : localStorage || window.localStorage;
                let keys = [];
                for(let i=0,l=ls.length;i<l;i++){
                    keys.push(ls.key(i));
                };
                keys.sort();
                return keys;
            },
            data_driven: function(dataList=[], rewrite=false, index=[0]) {
                const _d = dragger, // console.log(this);
                      ls = localStorage || window.localStorage,
                      ls_conf = _d.init._conf.static,
                      ls_sortKeys = this.sort_stored(),
                      ls_prefix = ls_conf.dataPrefix,
                      ls_rebuild = index === true, //typeof index==='boolean'
                      ls_delete = index === false; //typeof index==='boolean'
                try {
                    if(!dataList || dataList.length<=0 || !dataList instanceof Array){
                        throw new Error('invalid dataList.');
                    };
                    if(ls_delete){
                        const delKey = ls_sortKeys[dataList[0]];
                        ls.removeItem(delKey);
                        console.log('deleting ls..', delKey);
                        return;
                    }else if(ls_rebuild){
                        ls.clear();
                        console.log('rebuilding ls..');
                    };
                    dataList.forEach((t, i)=> {
                        let key = ls_prefix + i,
                            val = t.outerHTML;
                        // manual rebuild or auto init if no dataStored
                        if(ls_rebuild || !ls_conf.dataStored){
                            ls.setItem(key, val);
                            console.log('localStorage '+key+' built.');
                            return;
                        }
                        // manual rewrite with specified indexes
                        if(!rewrite || !index instanceof Array) throw new Error('invalid rewrite/index.');
                        key = ls_sortKeys[index[i]]; // update dataList indexes
                        if(!ls.getItem(key)){
                            // throw new Error('updating key '+key+' does NOT exists!', t);
                            console.warn('updating key '+ls_prefix+index[i]+': '+key+'!', t);
                            return;
                        }
                        ls.setItem(key, val);
                        console.log(key+' updated.');
                    });
                } catch (error) {
                    console.log(error);
                }
            },
            drop_update: function(listsNode=null,dragParent=null,dropNode=null,dragUpdateList=null,dropUpdateList=null, _dropOnDragList=false,_dragFromStackList=false,_dragOnList=false) {
                const data_driven = this.mod.methods.data_driven.bind(this.mod.methods), // bind 'this' for data_driven context environment
                      child_indexer = this.mod._utils.child_indexer,
                      _conf = this.init._conf,
                      data_prefix = _conf.static.dataPrefix;
                dropNode.classList.add(_conf.class.drop);  //stop transition
                dropNode.classList.remove(_conf.class.enter);  //remove symbol
                // drop on drag list, same origin update drag list.
                if(_dropOnDragList){
                    data_driven([dragUpdateList], true, [child_indexer(dragUpdateList)]);
                    console.log('updating same origin', dropUpdateList);
                    return;
                }
                // drag list(NOT from stackdList) then drop near item, rebuild ls.
                if(_dragOnList && !_dragFromStackList){
                    console.log('drag list(not stacked) movement, rebuild..');
                    data_driven(listsNode.childNodes, true, true);
                    return;
                }
                let _dropToStackList = dropNode!==dropUpdateList; // drop 放置状态：检查当前 目标 元素不为列表更新元素（检测范围：拖拽外部元素至内部列表，_dragFromStackList 状态相反）
                // none of drag/drop stackedList, standard updates.
                if(!_dragFromStackList && !_dropToStackList){
                    const dragListIndex = child_indexer(dragParent),
                          dropListIndex = child_indexer(dropNode);
                    data_driven([dragParent, dropNode], true, [dragListIndex, dropListIndex]);
                    console.log('add from',data_prefix+dragListIndex,'to',data_prefix+dropListIndex);
                    return;
                }
                // drag stackedList to stackedList, update both stackedLists.
                if(_dragFromStackList && _dropToStackList){
                    data_driven([dragUpdateList, dropUpdateList], true, [child_indexer(dragUpdateList), child_indexer(dropUpdateList)]);
                    console.log('add from dragStacked',dragUpdateList,'to dropStacked', dropUpdateList);
                    return;
                }
                // drag from stackedList or drop to stackedList, update stackedList and the other ls.
                if(_dragFromStackList){  
                    data_driven([dragUpdateList, dropNode], true, [child_indexer(dragUpdateList), child_indexer(dropNode)]);
                    console.log('add from dragStacked');
                }else if(_dropToStackList){
                    data_driven([dragParent, dropUpdateList], true, [child_indexer(dragParent), child_indexer(dropUpdateList)]);
                    console.log('add to dropStacked');
                }
                return;
            }
        },
        behavior: {
            dragstart: function(e){
                e = this.mod._utils.getEvent(e);
                const t = this.mod._utils.getTarget(e),
                      c = this.init._conf.class;
                t.classList.add(c.press);
                e.dataTransfer.setData('Text', c.press);
            },
            drag: function(e){
                // console.log(e)
            },
            dragend: function(e){
                // console.log(e)
            },
            dragenter: function(e){
                const _util = this.mod._utils,
                      _conf = this.init?._conf;
                e = _util.getEvent(e);
                const _cls = _conf.class,
                      enterTarget = _util.getTarget(e),
                      enterParent = _util.parent_finder(enterTarget, _cls.list),
                      dragTarget = document.querySelector('.'+_cls.press),
                      dragParent = _util.parent_finder(dragTarget, _cls.list);
                dragParent.classList.remove(_conf.class.drop, _conf.class.enter);
                if(!enterParent || dragTarget.classList.contains(_cls.list) || enterParent===dragParent || dragParent.childElementCount<=this.init._conf.static.maxRemains){
                    return;
                }
                enterParent.classList.add(_cls.enter);  //add symbol
                enterParent.classList.remove(_cls.drop);  //start transition
            },
            dragover: function(e){
                const _util = this.mod._utils,
                      _conf = this.init?._conf,
                      _cls = _conf.class,
                      list_class = _cls.list;
                e = _util.getEvent(e);
                _util.preventDefault(e);
                const dropTarget = _util.getTarget(e),
                      dragTarget = document.querySelector("."+_cls.press),
                      dropUnderList = _util.parent_finder(dropTarget, list_class);
                if(dropTarget===dragTarget) return;
                // checking(both item/list) maxRemains limitations
                if(dragTarget.parentNode.childElementCount<=_conf.static.maxRemains){
                    console.debug('reaching maxRemains, canceled');
                    return;
                };
                // drag li -> li/list(both)
                if(dropTarget.nodeName.toUpperCase()===_conf.static.listTag && dropUnderList){
                    _util.coords_detector(e, dropTarget, ()=> {  // check li-engage statu(top or bottom)
                        dropTarget.classList.remove(_cls.dropAfter);
                        dropTarget.classList.add(_cls.dropBefore);
                    }, ()=> {
                        dropTarget.classList.remove(_cls.dropBefore);
                        dropTarget.classList.add(_cls.dropAfter);
                    });
                    return;
                }
                // drag from list(only), drop on
                if(dragTarget.classList.contains(list_class)){
                    let dragOverStackList = dropTarget.parentNode!==_conf.element.wrap;
                    if(!dropTarget.classList.contains(list_class) || dragOverStackList){
                        return;  // drop to list(outside only, no stackedList)
                    }
                    const dragTargetHeight = dragTarget.offsetHeight,
                          dragTargetWidth = dragTarget.offsetWidth,
                          dropTargetPrevs = dropTarget.previousSibling;
                    _util.coords_detector(e, dropTarget, false,false, ()=> {  // check list-engage statu(left or right)
                        dropTarget.classList.remove(_cls.dropAfter);
                        dropTarget.classList.add(_cls.dropBefore);
                        dropTarget.style.cssText = `--dragTargetHeight:${dragTargetHeight}px;`;
                        if(dropTargetPrevs){
                            // use transform insted of margin, incase of margin-left:${dragTargetWidth}px; offsets.
                            dropTargetPrevs.style.transform = 'translateX(-'+dragTargetWidth+'px)';
                        }else{
                            // drag to first list, moving first-child margin-right offset
                            dropTarget.style.cssText += `margin-right:${dragTargetWidth}px;`;
                        }
                        console.debug('moving left..');
                    }, ()=> {
                        dropTarget.classList.remove(_cls.dropBefore);
                        dropTarget.classList.add(_cls.dropAfter);
                        dropTarget.style.cssText = `--dragTargetHeight:${dragTargetHeight}px;margin-right:${dragTargetWidth}px;`;
                        // clear transform statu if moved left side on previousSibling
                        if(dropTargetPrevs && dropTargetPrevs.style) dropTargetPrevs.style.transform = '';
                        console.debug('moving right..');
                    });
                }
            },
            dragleave: function(e){
                const _util = this.mod._utils,
                      _cls = this.init?._conf.class;
                e = _util.getEvent(e);
                const t = _util.getTarget(e);
                if(!t|| !t.classList) return;
                t.classList.remove(_cls.dropBefore, _cls.dropAfter, _cls.enter);
                // remove drag-list status
                t.style.cssText = "";
                if(t.previousSibling && t.previousSibling.style) t.previousSibling.style.transform = '';
            },
            drop: function(e){
                const _util = this.mod._utils,
                      _mods = this.mod.methods,
                      _conf = this.init?._conf,
                      _cls = _conf.class,
                      list_class = _cls.list,
                      lists_node = _conf.element.wrap;
                e = _util.getEvent(e);
                _util.preventDefault(e);
                const dropTarget = _util.getTarget(e),
                      dragData = e.dataTransfer.getData("Text"),
                      dragTarget = document.querySelector('.'+dragData),
                      dragParent = _util.parent_finder(dragTarget, list_class);
                let dragOnList = dragTarget.classList.contains(list_class),
                    dropOnList = dropTarget.classList.contains(list_class),
                    dropOnItem = dropTarget.nodeName.toUpperCase()===_conf.static.listTag;
                // remove drag-statu (release pressing before cancel)
                dragTarget.classList.remove(_cls.dropBefore, _cls.dropAfter, _cls.press);
                // remove drop-list status (remove previousSibling transform if exists)
                dropTarget.style.cssText = "";
                if(dropTarget.previousSibling && dropTarget.previousSibling.style) dropTarget.previousSibling.style.transform = '';
                // checking maxRemains limitation
                if(dragTarget.parentNode.childElementCount<=_conf.static.maxRemains){ //dragTarget.nodeName.toUpperCase()===_conf.static.listTag && 
                    console.log('reaching maxRemains, abort on', dragTarget.parentNode);
                    return;
                };
                // drop on list(only, continue to switch dropOnItem)
                if(dragOnList && !dropOnItem){
                    switch (true) {
                        case dropTarget===dragParent:
                            console.log('drop on same-origin while ordering lists', dropTarget);
                            return;
                        case dropTarget.parentNode!==lists_node || !_util.parent_traversal(dropTarget, lists_node):
                            console.log('drop on wrong-target while ordering lists (drop target must OVER list(can NOT drop on stackList), current:', dropTarget);
                            return;
                    }
                    // rebuild ls
                    console.log('reordering lists, rebuild..');
                    _util.coords_detector(e, dropTarget,false,false, ()=> {
                        lists_node.insertBefore(dragTarget, dropTarget);
                        console.debug('drop on left');
                    }, ()=> {
                        lists_node.insertBefore(dragTarget, dropTarget.nextElementSibling);
                        console.debug('drop on right');
                    });
                    // remove drop-statu(after coords_detector, offsetHeight issue)
                    dropTarget.classList.remove(_cls.dropBefore, _cls.dropAfter);
                    // update data(rebuild)
                    _mods.data_driven(lists_node.childNodes, true, true);
                    return;
                };
                const dragUpdateList = _util.parent_traversal(dragParent, lists_node),
                      dropUpdateList = _util.parent_traversal(dropTarget, lists_node);
                let dropOnDragList = dragUpdateList===dropUpdateList,
                    dragFromStackList = dragParent!==dragUpdateList;
                // 抓取状态->1：判断当前抓取 目标 祖先元素父级不为顶级（检测范围：拖拽内部元素至外部列表===true）
                switch (true) {
                    case dropOnItem:
                        if(dropTarget===dragTarget){
                            console.log('hold insert..');
                            break;
                        }
                        // insert node.
                        const dropParent = _util.parent_finder(dropTarget, list_class);
                        _util.coords_detector(e, dropTarget, ()=> {
                            dropParent.insertBefore(dragTarget, dropTarget);
                            console.debug('insert before');
                        }, ()=> {
                            dropParent.insertBefore(dragTarget, dropTarget.nextElementSibling);
                            console.debug('insert after');
                        });
                        // remove drop-statu(included enter, all removement must exec after coords_detector incase of dropTarget offsetSize was sent incorrect)
                        dropTarget.classList.remove(_cls.dropBefore, _cls.dropAfter, _cls.enter);
                        // update data
                        _mods.drop_update.apply(this, [lists_node,dragParent,dropParent,dragUpdateList,dropUpdateList, dropOnDragList,dragFromStackList,dragOnList]); //,dragStackIndex
                        break;
                    case dropOnList:
                    default:
                        if(dropTarget===dragParent || !dropOnList){
                            console.log('hold append..');
                            break;
                        }
                        // append node.
                        dropTarget.appendChild(dragTarget);
                        // update data.
                        _mods.drop_update.apply(this, [lists_node,dragParent,dropTarget,dragUpdateList,dropUpdateList, dropOnDragList,dragFromStackList]); //,dragStackIndex
                        break;
                }
            },
        },
    },
    __proto__: {
        init: function(user_conf = {}){
            const _util = dragger.mod._utils,
                  _this = Object.getPrototypeOf(this)!==dragger.init.prototype ? dragger.init.prototype : this;
            try {
                // rewrite user-conf.
                dragger.init._conf = _this._singleton_conf._rewriter.call(_this, user_conf);
                // init&load dom..
                dragger.dom.initiate();
                document.body.appendChild(dragger.init._conf.element.wrap);
                // bind&exec dom events...
                _util.addEvent(document, 'dragstart', dragger.mod.behavior.dragstart.bind(dragger));
                // _util.addEvent(document, 'dragend', dragger.mod.behavior.dragend.bind(dragger));
                _util.addEvent(document, 'dragenter', dragger.mod.behavior.dragenter.bind(dragger));
                _util.addEvent(document, 'dragover', dragger.mod.behavior.dragover.bind(dragger));
                // _util.addEvent(document, 'dragover', _util.throttler((e)=>dragger.mod.behavior.dragover.call(dragger, e), 250));
                _util.addEvent(document, 'dragleave', dragger.mod.behavior.dragleave.bind(dragger));
                _util.addEvent(document, 'drop', dragger.mod.behavior.drop.bind(dragger));
                console.log('dragger api initialized.', dragger);
            } catch (error) {
                console.log(error)
            }
        },
    },
    get list(){
        return {
            el: this.init._conf.element.wrap,
            ls: localStorage || window.localStorage,
        };
    },
    set list(_args={}){
        const _conf = this.init._conf,
              _util = this.mod._utils,
              _mods = this.mod.methods,
              wrapper = _conf.element.wrap,
              liTag = _conf.static.listTag;
        _util.args_rewriter.apply(dragger, [_args, {
            select: {list: 0,item: 0,},
            action: {
                group: {tag: liTag,count: 1,child: 0,content: '',},
                delete: false,update: false,
            },
        }, (args_)=> {
            let lsNodes = wrapper.childNodes,
                lsCount = lsNodes.length, //lsCount(origin length) for append
                lsIndex = _util.num_validator(args_.select.list) ? args_.select.list : 0,
                lsTarget = lsNodes[lsIndex],
                useGroup = args_.action.group.tag&&args_.action.group.tag!==liTag ? args_.action.group : false,
                onUpdate = args_.action.update,
                onDelete = args_.action.delete;
            if(useGroup){ // edit list
                if(onDelete){ // delete list
                    try {
                        if(lsIndex<0 || lsIndex>=lsCount) throw new Error('out of specific list index range!');
                        lsTarget = lsNodes[lsIndex];
                        console.log('list deleted', lsTarget);
                        lsTarget.remove();
                        // update data(lsIndex insted of lsTarget for delete locating)
                        if(onUpdate) _mods.data_driven([lsIndex], true, false);
                        return;
                    } catch (error) {
                        console.warn(error);
                        return false;
                    }
                }
                // select list
                if(!lsIndex || isNaN(lsIndex) || lsIndex > lsCount) lsIndex = lsCount; //restore default
                if(lsIndex < 0){
                    lsIndex = 0;
                    console.log('Minimum lsNodes index, restore to 0!');
                }
                // insert lists
                let cc = useGroup.count;
                for(let i=0;i<cc;i++){
                    const newList = _mods.init_list.apply(_conf, [useGroup.tag, useGroup.child, useGroup.content]); // useGroup.content = newList;
                    wrapper.insertBefore(newList, lsNodes[lsIndex]);
                }
                console.log(cc+' list(s) settle down.');
                // save data(rebuild ls)
                if(onUpdate) _mods.data_driven(lsNodes, true, true); //getter: this.list.el
                return;
            }
            // select list
            if(lsIndex < 0){
                lsIndex = 0;
                console.log('Minimum lsNodes index, restore to 0!');
            }else if(lsIndex > lsCount-1){  //lsCount-1 for insertBefore
                lsIndex = lsCount-1;
                console.log('Maximum lsNodes index(-1), forward to '+lsIndex+' !');
            }
            // create item
            lsTarget = lsNodes[lsIndex]; //useGroup ? useGroup.content : lsNodes[lsIndex],
            let liIndex = _util.num_validator(args_.select.item) ? args_.select.item : 0;
            const liCount = lsTarget.childElementCount,
                  li = document.createElement(liTag);
            li.draggable = true;
            li.innerHTML = args_.action.group.content || _conf.static.dataPrefix + _util.rand_number(0,100,null,[0,100]);
            // delete item
            if(onDelete){
                try {
                    if(liIndex<0 || liIndex>=liCount || liCount<=_conf.static.maxRemains) throw new Error('out of specific item index range!(perhaps maxRemains?)');
                    let liTarget = lsTarget.childNodes[liIndex];
                    console.log('item deleted', liTarget);
                    liTarget.remove();
                    // update data
                    if(onUpdate) _mods.data_driven([lsTarget], true, [_util.child_indexer(lsTarget)]);
                    return;
                } catch (error) {
                    console.warn(error);
                    return false;
                }
            }
            // select item
            if(!liIndex || isNaN(liIndex) || liIndex > liCount) liIndex = liCount; //restore default
            if(liIndex < 0){
                liIndex = 0;
                console.log('Minimum li index, restore to 0!');
            }
            // insert item
            lsTarget.insertBefore(li, lsTarget.childNodes[liIndex]);
            console.log('item updates set: ', lsTarget);
            // save data(update item)
            if(onUpdate) _mods.data_driven([lsTarget], true, [_util.child_indexer(lsTarget)]);
        }]);
    },
};

Object.defineProperties(dragger.init.prototype, {
    _singleton_conf: {
        value: function(){
            let privatePresets = {
                    static: {
                        listTag: 'LI',
                        maxRemains: 0,
                        dataPrefix: 'ls_',
                        dataStored: false, //record if any init_list ls exists.
                    },
                    class: {
                        wrap: 'lists',
                        list: 'list',
                        press: 'press',
                        enter: 'enter',
                        drop: 'drop',
                        dropBefore: 'before',
                        dropAfter: 'after',
                    },
                    element: {wrap: null,},
                };
            return {
                publicDefault: Object.create(null),
                _rewriter: function fn(conf=this.publicDefault, opts=privatePresets) {
                    if(opts &&Object.prototype.toString.call(opts)==='[object Object]'){
                        for(const [key, val] of Object.entries(opts)){
                            // back-write (mark non-existent property)
                            conf[key] ??= val; //conf[key] ||= val;
                            // recursion-loop (use fn call-stack for recursion-func)
                            fn.apply(this, [conf[key], val]);
                            // this._rewriter.apply(this, [opts[key], val]);// arguments.callee.apply(this, [conf[key], val]);
                        }
                    }
                    // clear closure recycle-quotes
                    opts = privatePresets = null;
                    return conf;
                },
            }
        }(),
        configurable: false,
    },
});