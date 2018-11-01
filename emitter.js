'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
const isStar = false;

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

    return {

        /**
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @returns {Object}
         */
        on: function (event, context, handler) {// если понадобится проверь параметры
            let newStudent = { context: context, handler: handler };
            if (!eventHandlers[event]) {
                eventHandlers[event] = [newStudent];
            } else {
                eventHandlers[event].push(newStudent);
            }

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
            for (let eventName of eventCleaner) {// xm
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
            eventReporter.forEach(element => {
                if (eventHandlers[element]) {
                    eventHandlers[element].forEach(element2 => {
                        element2.handler.call(element2.context);
                    });
                }
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
            console.info('several');
            console.info(event, context, handler, times);

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
            console.info('through');
            console.info(event, context, handler, frequency);

            return this;
        }
    };
}

module.exports = {
    getEmitter,

    isStar
};
