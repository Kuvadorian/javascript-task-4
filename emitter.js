'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
const isStar = true;

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    let eventHandlers = {};

    function getOff(event) {
        return Object.keys(eventHandlers).filter(eventName => eventName === event ||
            eventName.startsWith(event + '.'));
    }

    function getEmit(event) {
        return Object.keys(eventHandlers).filter(eventName => eventName === event ||
            event.startsWith(eventName + '.'))
            .reverse();
    }

    function addStudent(event, newStudent) {
        if (!eventHandlers[event]) {
            eventHandlers[event] = [newStudent];
        } else {
            eventHandlers[event].push(newStudent);
        }
    }

    function callFunction(record) {
        record.handler.call(record.context);
    }

    function hasExtraProperties(record) {
        return record.frequency || record.times !== undefined;
    }

    function checkForSeveral(record) {
        return record.times && record.times !== 0;
    }

    function checkForThrough(record) {
        if (record.frequency) {
            if (record.numberCalls % record.frequency === 0) {
                return true;
            }
            record.numberCalls++;
        }

        return false;
    }

    return {

        /**
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @returns {Object}
         */
        on: function (event, context, handler) { // если понадобится проверь параметры
            let newStudent = { context: context, handler: handler };
            addStudent(event, newStudent);

            return this;
        },

        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         * @returns {Object}
         */
        off: function (event, context) {
            let eventCleaner = getOff(event);
            for (let eventName of eventCleaner) {
                eventHandlers[eventName] = eventHandlers[eventName].filter(element => {
                    return element.context !== context;
                });
            }

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} event
         * @returns {Object}
         */
        emit: function (event) {
            let eventReporter = getEmit(event);
            console.info(eventReporter + 'hey');
            eventReporter.forEach(element => {
                eventHandlers[element].forEach(element2 => {
                    console.info(element2);
                    if (event === 'begin' || !hasExtraProperties(element2)) {
                        console.info('Просто');
                        callFunction(element2);

                        return;
                    }
                    if (checkForSeveral(element2)) {
                        callFunction(element2);
                        console.info('times');
                        element2.times--;

                        return;
                    }
                    if (checkForThrough(element2)) {
                        callFunction(element2);
                        element2.numberCalls++;
                    }
                });
            });

            return this;
        },

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         * @returns {Object}
         */
        several: function (event, context, handler, times) {
            let newStudent = { context: context, handler: handler, times: times };
            addStudent(event, newStudent);

            return this;
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         * @returns {Object}
         */
        through: function (event, context, handler, frequency) {
            let newStudent = {
                context: context, handler: handler,
                frequency: frequency, numberCalls: 0
            };
            addStudent(event, newStudent);

            return this;
        }
    };
}

module.exports = {
    getEmitter,

    isStar
};
