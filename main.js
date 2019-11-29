function zero(num) {
	if (num < 10) {
		return '0' + num;
	}
	return num;
}
function newTime(zone) {
	var d = new Date();
	$(`#${zone.city}`).html(zero(d.getHours() + zone.offset));
	$('.m').html(zero(d.getMinutes()));
	$('.s').html(zero(d.getSeconds()));
}
const zones = [
	{ city: 'TLV', offset: 2 },
	{ city: 'MI', offset: -7 },
	{ city: 'TB', offset: 2 },
	{ city: 'LA', offset: -10 },
	{ city: 'CH', offset: -8 },
];

setInterval(() => {
	zones.forEach((zone) => {
		newTime(zone);
	});
}, 1000);
