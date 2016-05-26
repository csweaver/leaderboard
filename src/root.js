import React, { Component } from 'react'
import {render} from 'react-dom'
import {maxBy} from 'lodash/maxBy'


const Time = (props) => {
	return <div className={props.clss}>{props.lap}<span className='seconds'>{props.content}</span></div>

}

const getMinIndexTimeArray = (arr) => {
	let millisArr = arr.map((i) => {
		let splitTime = i.split(':');
		let millis = Infinity
		if (splitTime[0] != '-') {
			millis = (parseInt(splitTime[0]) * (1000 * 60)) 
			let secondsSplit = splitTime[1].split('.')
			millis += parseInt(secondsSplit[0]) * 1000 + parseInt(secondsSplit[1])
		}
		return millis
	})
	return millisArr
}

const Times = (props) => {
	let times = []
	let minArr = getMinIndexTimeArray(props.times)
	let minIdx = minArr.indexOf(Math.min(...minArr));
	for (let i = 0; i < props.times.length; i++) {
		let clsName = 'time '
		let time = props.times[i]
		if (time[0] === '-') {
			clsName += "incomplete "
		}
		else if (time === '5:00.000') {
			clsName += "max "
		}
		if (minIdx == i) {
			clsName += "fastest "
		}
		let lap = i+1
		let lapContent = `Lap ${lap} `
		let timeContent = `${time}`
		times.push(<Time clss={clsName} lap={lapContent} content={timeContent} />)
	}
	return (
		<div className='times'>{times}</div>
	)
}


const Team = (props) => {
	return (
		<div className='team'>
			<div className='number'>
				{props.number}
			</div>
			<div className='team-icon'>
				<img src={props.icon} alt='the team'/>
			</div>
			<div className='team-name'>
				<div className='group-name'>
					{props.name}
				</div>
				<div className='members'>
					{props.members}
				</div>
			</div>
		</div>
	)
}


const LBItem = (props) => {
	let icon='assets/img/bronze-star.jpg'
	if (props.idx == 0) icon = 'assets/img/golden-star.jpg'
	else if (props.idx == 1) icon = 'assets/img/silver-star.jpg'
	return (
		<div className='lb_item'>
			<Team name={props.team} number={props.number} icon={icon} members={props.members}  />
			<Times times={props.times} />
		</div>
	)
}


class Leaderboard extends Component {

	render() {
		let data = this.props.data
		data.sort( (a,b) => {
			let amin = Math.min(...getMinIndexTimeArray(a.times))
			let bmin = Math.min(...getMinIndexTimeArray(b.times))
			
			return amin - bmin
		})
		console.log(data)
		let teams = []
		for (let teamIdx in data) {
			const team = data[teamIdx]
			const number = parseInt(teamIdx) + 1
			teams.push(<LBItem team={team.name} members={team.members} number={number} times={team.times} idx={teamIdx} key={`team${teamIdx}`} />)
		}
		return <div class='leaderboard'>{teams}</div>
	}
}



render (
	<Leaderboard data={data} />,
	document.getElementById('content')
)


