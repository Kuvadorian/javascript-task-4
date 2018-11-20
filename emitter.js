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
    const eventHandlers = {};
    const hasEvent = (event, event1) => event === event1;
    const beginWith = (event, event1) => event.startsWith(event1 + '.');

    function getOffEvents(event) {
        return Object.keys(eventHandlers)
            .filter(eventName => hasEvent(eventName, event) || beginWith(eventName, event));
    }

    function getEmittingEvents(event) {
        return Object.keys(eventHandlers)
            .filter(eventName => hasEvent(eventName, event) || beginWith(event, eventName));
    }

    function addStudent(event, newStudent) {
        if (!eventHandlers[event]) {
            eventHandlers[event] = [];
        }
        eventHandlers[event].push(newStudent);
    }

    function callFunction(record) {
        record.handler.call(record.context);
    }

    function hasExtraProperties(record) {
        return record.frequency || record.times !== undefined;
    }

    function checkForSeveral(record) {
        return record.times;
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

    function lengthSort(first, second) {
        if (first.length < second.length) {
            return 1;
        } else if (first.length > second.length) {
            return -1;
        }

        return 0;
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
            const newStudent = { context, handler };

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
            const eventsToСlear = getOffEvents(event);

            for (let eventName of eventsToСlear) {
                eventHandlers[eventName] = eventHandlers[eventName]
                    .filter(element => element.context !== context);
            }

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} event
         * @returns {Object}
         */
        emit: function (event) {
            const eventReporter = getEmittingEvents(event)
                .sort(lengthSort);

            eventReporter.forEach(eventName => {
                eventHandlers[eventName].forEach(record => {
                    if (!hasExtraProperties(record)) {
                        callFunction(record);

                        return;
                    }
                    if (checkForSeveral(record)) {
                        callFunction(record);
                        record.times--;

                        return;
                    }
                    if (checkForThrough(record)) {
                        callFunction(record);
                        record.numberCalls++;
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
            const newStudent = { context, handler, times };

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
            const newStudent = { context, handler, frequency, numberCalls: 0 };

            addStudent(event, newStudent);

            return this;
        }
    };
}

module.exports = {
    getEmitter,

    isStar
};
