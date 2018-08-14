(function(){
	window.myQuiz = {};
	var me = window.myQuiz;

	// Internal use variables.
	me._currentQuestion = undefined;
	me._questionsList = undefined;

	// HTML Selector identifiers.
	me._questionNumberElementSelector = undefined;
	me._questionTitleElementSelector = undefined;
	me._questionDescriptionElementSelector = undefined;
	me._nextButtonElementSelector = undefined;
	me._previousButtonElementSelector = undefined;
	me._finishButtonElementSelector = undefined;
	me._answerElementSelector = undefined;
	me._questionContainerElementSelector = undefined;

	// HTML elements
	me.questionNumberElement = undefined;
	me.questionTitleElement = undefined;
	me.questionDescriptionElement = undefined;
	me.nextButtonElement = undefined;
	me.previousButtonElement = undefined;
	me.finishButtonElement = undefined;
	me.answerElement = undefined;
	me.questionContainerElement = undefined;

	me.init = function(){
		me._currentQuestion = 0;
		me._questionsList = [
			{
				title: "¿Cómo te llamas?",
				description: "Escribe tu nombre completo.",
				answer: "" // Propiedad usada para guardar las respuestas de la pregunta
			},
			{
				title: "¿Sabes Javascript?",
				description: "Responde honestamente.",
				answer: ""
			},
			{
				title: "¿Sabes JQuery?",
				description: "Responde honestamente.",
				answer: ""
			},
			{
				title: "¿Tienes Frio?",
				description: "Responde honestamente.",
				answer: ""
			}
		];

		me._questionNumberElementSelector = "#questionNumberQuiz";
		me._questionTitleElementSelector = "#questionTitle";
		me._questionDescriptionElementSelector = "#questionDescription";
		me._previousButtonElementSelector = "#previousButton";
		me._nextButtonElementSelector = "#nextButton";
		me._finishButtonElementSelector = "#finishButton";
		me._answerElementSelector = "#answer";
		me._questionContainerElementSelector = "#questionContainer";

		me.questionNumberElement = $(me._questionNumberElementSelector);
		me.questionTitleElement = $(me._questionTitleElementSelector);
		me.questionDescriptionElement = $(me._questionDescriptionElementSelector);
		me.previousButtonElement = $(me._previousButtonElementSelector);
		me.nextButtonElement = $(me._nextButtonElementSelector);
		me.finishButtonElement = $(me._finishButtonElementSelector);
		me.answerElement= $(me._answerElementSelector);
		me.questionContainerElement = $(me._questionContainerElementSelector);

		me.loadQuestion(me._currentQuestion);
	};

	me.goToNextQuestion = function(){
		me.saveAnswer();
		me.animateSection(true);
		me.loadQuestion(me._currentQuestion + 1);
	};

	me.goToPreviousQuestion = function(){
		me.saveAnswer();
		me.animateSection(false);
		me.loadQuestion(me._currentQuestion - 1);
	};

	me.finishQuiz = function(){
		me.saveAnswer();
	};

	me.animateSection = function(isNext){
		me.questionContainerElement.css("right", "");
		me.questionContainerElement.css("left", "");
 
		var configsToAnimate = isNext ? {right: "9999px"} : {left: "9999px"};
		me.questionContainerElement.animate(configsToAnimate, 300, function(){
			if(isNext){
				me.questionContainerElement.css("right", "");
				me.questionContainerElement.css("left", "9999px");
			}else{
				me.questionContainerElement.css("left", "");
				me.questionContainerElement.css("right", "9999px");
			}

			me.questionContainerElement.animate({right: 0, left: 0}, 300);
		});
		/*
		var configsToAnimate = undefined;
		if(isNext){
			configsToAnimate = {right: "9999px"};
		}else{
			configsToAnimate = {left: "9999px"};
		}
		*/

	}

	me.saveAnswer = function(){
		var currentQuestion = me._questionsList[me._currentQuestion];
		currentQuestion.answer = me.answerElement.val();
	};

	me.loadQuestion = function(questionNumber){
		if(!me.validateQuestionNumber(questionNumber)){
			console.error("Número de pregunta inválido.");
			return;
		}

		var currentQuestion = me._questionsList[questionNumber];

		// $("#questionNumber").text(me.composeQuestionNumber());

		me._currentQuestion = questionNumber;
		me.questionNumberElement.text(me.composeQuestionNumber());
		me.questionTitleElement.html(currentQuestion.title);
		me.questionDescriptionElement.text(currentQuestion.description);
		me.answerElement.val(currentQuestion.answer);

		me.setupInterface();
	};

	me.composeQuestionNumber = function(){
		var questionsTotal = me._questionsList.length;
		var currentQuestion = me._currentQuestion + 1;
		//Javascript Puro
		/*return "Pregunta " + currentQuestion + " de " + questionsTotal;*/

		//Ecmascript 5 y versiones anteriores.
		/*return "Pregunta {0} de {1}"
					.replace("{0}", currentQuestion)
					.replace("{1}", questionsTotal);*/

		//EcmaSript 6
		return `Pregunta ${currentQuestion} de ${questionsTotal}`;
	};

	me.setupInterface = function(){
		var currentQuestion = me._currentQuestion;

		// Validating previous button
		if(currentQuestion > 0){
			me.previousButtonElement.show();
		}else{
			me.previousButtonElement.hide();
		}

		// Validating next button
		if(currentQuestion + 1 < me._questionsList.length){
			me.nextButtonElement.show();
		}else{
			me.nextButtonElement.hide();
		}

		// Validating finish button
		if(currentQuestion + 1 === me._questionsList.length){
			me.finishButtonElement.show();
		}else{
			me.finishButtonElement.hide();
		}
	};

	me.validateQuestionNumber = function(questionNumber){
		if(questionNumber === undefined){
			return false;
		}

		if(questionNumber < 0)
			return false;
		

		if(questionNumber >= me._questionsList.length)
			return false;

		return true;
	}

})();