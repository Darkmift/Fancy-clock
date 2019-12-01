$('.errorMsg').hide();
function zero(num) {
	if (num < 10) {
		return '0' + num;
	}
	return num;
}

async function newTime(zone) {
	var timeApi = await getHours();
	var fetchHour = timeApi[0] || undefined;
	var fetchMinutes = timeApi[1] || undefined;

	var d = new Date();
	var hours = fetchHour || d.getUTCHours();
	var minutes = fetchMinutes || d.getMinutes();

	if (hours != fetchHour || fetchMinutes != minutes) {
		$('.errorMsg').html(`api time:${fetchHour}:${fetchMinutes}&nbsp;&nbsp;||&nbsp;&nbsp;server time:${hours}:${minutes}`).show();
	} else {
		$('.errorMsg').html('Error Fetching time').hide();
	}
	zones.forEach((zone) => {
		$(`#${zone.city}`).html(zero(hours + zone.offset));
	});

	$('.m').html(zero(minutes));
	$('.s').html(zero(d.getSeconds()));
}

const zones = [
	{ city: 'TLV', offset: 2 },
	{ city: 'MI', offset: -5 },
	{ city: 'TB', offset: 4 },
	{ city: 'LA', offset: -8 },
	{ city: 'PH', offset: -7 },
	{ city: 'DA', offset: -6 },
];

setInterval(async () => {
	newTime();
}, 5000);

const getHours = async () => {
	var myDate = new Date();
	var minutes = myDate.getMinutes();
	var hours = myDate.getUTCHours();
	var time;
	var error = null;
	try {
		const query = await fetch('http://worldtimeapi.org/api/timezone/Europe/London.json');

		if (query.status !== 200) {
			error = query;
		} else {
			const response = await query.json();
			myDate = new Date(response.utc_datetime);
			minutes = myDate.getMinutes();
			hours = myDate.getUTCHours();
			time = `${hours}:${minutes}`;
		}
	} catch (error) {
	} finally {
		if (error) {
			console.log('TCL: getHours -> error', error);
			$('.errorMsg').show();
			return undefined;
		}
		console.log('TCL: getHours -> time', hours);
		return [ hours, minutes ];
	}
};

newTime();
