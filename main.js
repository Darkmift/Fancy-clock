function zero(num) {
	if (num < 10) {
		return '0' + num;
	}
	return num;
}
function newTime(zone) {
	var d = new Date();
	$(`#${zone.city}`).html(zero(d.getUTCHours() + zone.offset));
	$('.m').html(zero(d.getMinutes()));
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

setInterval(() => {
	zones.forEach((zone) => {
		newTime(zone);
	});
}, 1000);
