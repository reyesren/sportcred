import React, {useEffect, useState} from "react";
import {View} from "react-native";
import { Headline, Subheading, Chip, Card, Title, Divider, RadioButton, Paragraph, Button} from "react-native-paper";
import {ScrollView} from "react-native";


export const PlayoffView = (props) => {
    const locked = props.locked;
    const [round, setRound] = useState(0)
    const [firstRound, setFirstRound] = useState(props.picks.firstRound ? props.picks.firstRound : {})
    const [confSemis, setConfSemis] = useState(props.picks.confSemis ? props.picks.confSemis : {})
    const [confFinals, setConfFinals] = useState(props.picks.confFinals ? props.picks.confFinals : {})
    const [nbaFinals, setNbaFinals] = useState(props.picks.nbaFinals ? props.picks.nbaFinals : {})
    const eastTeams = props.teams.eastTeams ? props.teams.eastTeams : {}
    const westTeams = props.teams.westTeams ? props.teams.westTeams : {}

    function submitPicks() {
        props.submitPicksCallback({firstRound, confSemis, confFinals, nbaFinals});
    }

    useEffect(() => {
        if (Object.keys(props.picks).length !== 0) {
            setFirstRound(props.picks.firstRound)
            setConfSemis(props.picks.confSemis)
            setConfFinals(props.picks.confFinals)
            setNbaFinals(props.picks.nbaFinals)
        }
    }, [firstRound, confSemis, confFinals, nbaFinals, props.picks])


    const content = [
        <FirstRound setFirstRound={setFirstRound} next={() => setRound(p => p + 1)} east={eastTeams} west={westTeams} locked={locked} picks={firstRound}/>,
        <Semis teams={firstRound} setRound={setRound} setConfSemis={setConfSemis} locked={locked} picks={confSemis}/>,
        <ConfFinals teams={confSemis} setRound={setRound} setConfFinals={setConfFinals} locked={locked} picks={confFinals}/>,
        <NBAFinals teams={confFinals} setRound={setRound} setNbaFinals={setNbaFinals} locked={locked} picks={nbaFinals} submit={submitPicks}/>,
        <Overview firstRound={firstRound} confSemis={confSemis} confFinals={confFinals} nbaFinals={nbaFinals}/>
    ]

    if (Object.keys(props.picks).length !== 0) {
        return (
            <Overview firstRound={firstRound} confSemis={confSemis} confFinals={confFinals} nbaFinals={nbaFinals}/>
        );
    }


    return content[round]
}

const FirstRound = (props) => {

    const {e1name, e2name, e3name, e4name, e5name, e6name, e7name, e8name} = props.east
    const {w1name, w2name, w3name, w4name, w5name, w6name, w7name, w8name} = props.west
    const locked = props.locked;

    const [eg1, setEg1] = useState(props.picks.eg1 ? props.picks.eg1 : 'Pick a winner')
    const [eg2, setEg2] = useState(props.picks.eg2 ? props.picks.eg2 : 'Pick a winner')
    const [eg3, setEg3] = useState(props.picks.eg3 ? props.picks.eg3 : 'Pick a winner')
    const [eg4, setEg4] = useState(props.picks.eg4 ? props.picks.eg4 : 'Pick a winner')

    const [wg1, setWg1] = useState(props.picks.wg1 ? props.picks.wg1 : 'Pick a winner')
    const [wg2, setWg2] = useState(props.picks.wg2 ? props.picks.wg2 : 'Pick a winner')
    const [wg3, setWg3] = useState(props.picks.wg3 ? props.picks.wg3 : 'Pick a winner')
    const [wg4, setWg4] = useState(props.picks.wg4 ? props.picks.wg4 : 'Pick a winner')

    const [nextDisabled, setNextDisabled] = useState(true)

    function setWinner(setter, winner) {
        setter(winner);
    }

    useEffect(tryNext, [eg1, eg2, eg3, eg4, wg1, wg2, wg3, wg4, nextDisabled])

    function tryNext() {
        if (![eg1, eg2, eg3, eg4, wg1, wg2, wg3, wg4].includes('Pick a winner')) {
            props.setFirstRound({eg1, eg2, eg3, eg4, wg1, wg2, wg3, wg4})
            setNextDisabled(false)
        }
    }

    function next() {
        props.setFirstRound({eg1, eg2, eg3, eg4, wg1, wg2, wg3, wg4})
        props.next();
    }

    return (
      <ScrollView style={{flex: 1}}>
          <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
              <View style={{flexDirection: "column"}}>
                  <RadioButton.Group onValueChange={value => setWinner(setEg1, value)} value={eg1}>
                      <RadioButton.Item label={e1name} value={e1name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                      <RadioButton.Item label={e2name} value={e2name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                  </RadioButton.Group>
              </View>
              <Card style={{height: 50}}>
                  <Card.Content style={{justifyContent: "center", marginTop: -2}}>
                      <Paragraph ellipsizeMode='tail' numberOfLines={1} style={{width:100}}>
                          {eg1}
                      </Paragraph>
                  </Card.Content>
              </Card>
          </View>
          <Divider style={{height: 2}}/>

          <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
              <View style={{flexDirection: "column"}}>
                  <RadioButton.Group onValueChange={value => setWinner(setEg2, value)} value={eg2}>
                      <RadioButton.Item label={e3name} value={e3name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                      <RadioButton.Item label={e4name} value={e4name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                  </RadioButton.Group>
              </View>
              <Card style={{height: 50}}>
                  <Card.Content style={{justifyContent: "center", marginTop: -2}}>
                      <Paragraph ellipsizeMode='tail' numberOfLines={1} style={{width:100}}>
                          {eg2}
                      </Paragraph>
                  </Card.Content>
              </Card>
          </View>
          <Divider style={{height: 2}}/>

          <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
              <View style={{flexDirection: "column"}}>
                  <RadioButton.Group onValueChange={value => setWinner(setEg3, value)} value={eg3}>
                      <RadioButton.Item label={e5name} value={e5name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                      <RadioButton.Item label={e6name} value={e6name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                  </RadioButton.Group>
              </View>
              <Card style={{height: 50}}>
                  <Card.Content style={{justifyContent: "center", marginTop: -2}}>
                      <Paragraph ellipsizeMode='tail' numberOfLines={1} style={{width:100}}>
                          {eg3}
                      </Paragraph>
                  </Card.Content>
              </Card>
          </View>
          <Divider style={{height: 2}}/>

          <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
              <View style={{flexDirection: "column"}}>
                  <RadioButton.Group onValueChange={value => setWinner(setEg4, value)} value={eg4}>
                      <RadioButton.Item label={e7name} value={e7name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                      <RadioButton.Item label={e8name} value={e8name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                  </RadioButton.Group>
              </View>
              <Card style={{height: 50}}>
                  <Card.Content style={{justifyContent: "center", marginTop: -2}}>
                      <Paragraph ellipsizeMode='tail' numberOfLines={1} style={{width:100}}>
                          {eg4}
                      </Paragraph>
                  </Card.Content>
              </Card>
          </View>
          <Divider style={{height: 2}}/>

          <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
              <View style={{flexDirection: "column"}}>
                  <RadioButton.Group onValueChange={value => setWinner(setWg1, value)} value={wg1}>
                      <RadioButton.Item label={w1name} value={w1name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                      <RadioButton.Item label={w2name} value={w2name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                  </RadioButton.Group>
              </View>
              <Card style={{height: 50}}>
                  <Card.Content style={{justifyContent: "center", marginTop: -2}}>
                      <Paragraph ellipsizeMode='tail' numberOfLines={1} style={{width:100}}>
                          {wg1}
                      </Paragraph>
                  </Card.Content>
              </Card>
          </View>
          <Divider style={{height: 2}}/>

          <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
              <View style={{flexDirection: "column"}}>
                  <RadioButton.Group onValueChange={value => setWinner(setWg2, value)} value={wg2}>
                      <RadioButton.Item label={w3name} value={w3name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                      <RadioButton.Item label={w4name} value={w4name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                  </RadioButton.Group>
              </View>
              <Card style={{height: 50}}>
                  <Card.Content style={{justifyContent: "center", marginTop: -2}}>
                      <Paragraph ellipsizeMode='tail' numberOfLines={1} style={{width:100}}>
                          {wg2}
                      </Paragraph>
                  </Card.Content>
              </Card>
          </View>
          <Divider style={{height: 2}}/>

          <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
              <View style={{flexDirection: "column"}}>
                  <RadioButton.Group onValueChange={value => setWinner(setWg3, value)} value={wg3}>
                      <RadioButton.Item label={w5name} value={w5name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                      <RadioButton.Item label={w6name} value={w6name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                  </RadioButton.Group>
              </View>
              <Card style={{height: 50}}>
                  <Card.Content style={{justifyContent: "center", marginTop: -2}}>
                      <Paragraph ellipsizeMode='tail' numberOfLines={1} style={{width:100}}>
                          {wg3}
                      </Paragraph>
                  </Card.Content>
              </Card>
          </View>
          <Divider style={{height: 2}}/>

          <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
              <View style={{flexDirection: "column"}}>
                  <RadioButton.Group onValueChange={value => setWinner(setWg4, value)} value={wg4}>
                      <RadioButton.Item label={w7name} value={w7name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                      <RadioButton.Item label={w8name} value={w8name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                  </RadioButton.Group>
              </View>
              <Card style={{height: 50}}>
                  <Card.Content style={{justifyContent: "center", marginTop: -2}}>
                      <Paragraph ellipsizeMode='tail' numberOfLines={1} style={{width:100}}>
                          {wg4}
                      </Paragraph>
                  </Card.Content>
              </Card>
          </View>
          <Divider style={{height: 2}}/>

          <Button icon={"arrow-right"} disabled={nextDisabled} onPress={next}>
              Conference Semi-finals
          </Button>

      </ScrollView>
    );

}

const Semis = (props) => {
    const {eg1: e1name, eg2: e2name, eg3: e3name, eg4: e4name, wg1: w1name, wg2: w2name, wg3: w3name, wg4: w4name} = props.teams

    const [eg1, setEg1] = useState(props.picks.eg1 === undefined || !Object.values(props.teams).includes(props.picks.eg1)  ? 'Pick a winner' : props.picks.eg1 )
    const [eg2, setEg2] = useState(props.picks.eg2 === undefined || !Object.values(props.teams).includes(props.picks.eg2)  ? 'Pick a winner' : props.picks.eg2 )

    const [wg1, setWg1] = useState(props.picks.wg1 === undefined || !Object.values(props.teams).includes(props.picks.wg1)  ? 'Pick a winner' : props.picks.wg1 )
    const [wg2, setWg2] = useState(props.picks.wg2 === undefined || !Object.values(props.teams).includes(props.picks.wg2)  ? 'Pick a winner' : props.picks.wg2 )

    const [nextDisabled, setNextDisabled] = useState(true)

    function setWinner(setter, winner) {
        setter(winner);
    }

    useEffect(tryNext, [eg1, eg2, wg1, wg2, nextDisabled])

    function tryNext() {
        if (![eg1, eg2, wg1, wg2].includes('Pick a winner')) {
            props.setConfSemis({eg1, eg2, wg1, wg2})
            setNextDisabled(false)
        }
    }

    function next() {
        props.setConfSemis({eg1, eg2, wg1, wg2})
        props.setRound(p => p + 1)
    }

    return (
        <ScrollView style={{marginTop: 10, marginBottom: 100, flex: 1}}>
            <Button icon={"arrow-left"} disabled={false} onPress={() => props.setRound(p => p - 1)}>
                Back to First Round
            </Button>

            <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
                <View style={{flexDirection: "column"}}>
                    <RadioButton.Group onValueChange={value => setWinner(setEg1, value)} value={eg1}>
                        <RadioButton.Item label={e1name} value={e1name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                        <RadioButton.Item label={e2name} value={e2name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                    </RadioButton.Group>
                </View>
                <Card style={{height: 50}}>
                    <Card.Content style={{justifyContent: "center", marginTop: -2}}>
                        <Paragraph ellipsizeMode='tail' numberOfLines={1} style={{width:100}}>
                            {eg1}
                        </Paragraph>
                    </Card.Content>
                </Card>
            </View>
            <Divider style={{height: 2}}/>

            <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
                <View style={{flexDirection: "column"}}>
                    <RadioButton.Group onValueChange={value => setWinner(setEg2, value)} value={eg2}>
                        <RadioButton.Item label={e3name} value={e3name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                        <RadioButton.Item label={e4name} value={e4name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                    </RadioButton.Group>
                </View>
                <Card style={{height: 50}}>
                    <Card.Content style={{justifyContent: "center", marginTop: -2}}>
                        <Paragraph ellipsizeMode='tail' numberOfLines={1} style={{width:100}}>
                            {eg2}
                        </Paragraph>
                    </Card.Content>
                </Card>
            </View>
            <Divider style={{height: 2}}/>

            <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
                <View style={{flexDirection: "column"}}>
                    <RadioButton.Group onValueChange={value => setWinner(setWg1, value)} value={wg1}>
                        <RadioButton.Item label={w1name} value={w1name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                        <RadioButton.Item label={w2name} value={w2name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                    </RadioButton.Group>
                </View>
                <Card style={{height: 50}}>
                    <Card.Content style={{justifyContent: "center", marginTop: -2}}>
                        <Paragraph ellipsizeMode='tail' numberOfLines={1} style={{width:100}}>
                            {wg1}
                        </Paragraph>
                    </Card.Content>
                </Card>
            </View>
            <Divider style={{height: 2}}/>

            <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
                <View style={{flexDirection: "column"}}>
                    <RadioButton.Group onValueChange={value => setWinner(setWg2, value)} value={wg2}>
                        <RadioButton.Item label={w3name} value={w3name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                        <RadioButton.Item label={w4name} value={w4name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                    </RadioButton.Group>
                </View>
                <Card style={{height: 50}}>
                    <Card.Content style={{justifyContent: "center", marginTop: -2}}>
                        <Paragraph ellipsizeMode='tail' numberOfLines={1} style={{width:100}}>
                            {wg2}
                        </Paragraph>
                    </Card.Content>
                </Card>
            </View>
            <Divider style={{height: 2}}/>

            <Button icon={"arrow-right"} disabled={nextDisabled} onPress={next}>
                Conference Finals
            </Button>
        </ScrollView>
    );
}

const ConfFinals = (props) => {
    const {eg1: e1name, eg2: e2name, wg1: w1name, wg2: w2name} = props.teams

    const [eg1, setEg1] = useState(props.picks.eg1 === undefined || !Object.values(props.teams).includes(props.picks.eg1)  ? 'Pick a winner' : props.picks.eg1 )
    const [wg1, setWg1] = useState(props.picks.wg1 === undefined || !Object.values(props.teams).includes(props.picks.wg1)  ? 'Pick a winner' : props.picks.wg1 )



    const [nextDisabled, setNextDisabled] = useState(true)

    function setWinner(setter, winner) {
        setter(winner);
    }

    useEffect(tryNext, [eg1, wg1, nextDisabled])

    function tryNext() {
        if (![eg1, wg1].includes('Pick a winner')) {
            props.setConfFinals({eg1, wg1})
            setNextDisabled(false)
        }
    }

    function next() {
        props.setConfFinals({eg1, wg1})
        props.setRound(p => p + 1)
    }

    return (
        <ScrollView style={{marginTop: 10, marginBottom: 100, flex: 1}}>
            <Button icon={"arrow-left"} disabled={false} onPress={() => props.setRound(p => p - 1)}>
                Conference Semi-Finals
            </Button>

            <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
                <View style={{flexDirection: "column"}}>
                    <RadioButton.Group onValueChange={value => setWinner(setEg1, value)} value={eg1}>
                        <RadioButton.Item label={e1name} value={e1name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                        <RadioButton.Item label={e2name} value={e2name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                    </RadioButton.Group>
                </View>
                <Card style={{height: 50}}>
                    <Card.Content style={{justifyContent: "center", marginTop: -2}}>
                        <Paragraph ellipsizeMode='tail' numberOfLines={1} style={{width:100}}>
                            {eg1}
                        </Paragraph>
                    </Card.Content>
                </Card>
            </View>
            <Divider style={{height: 2}}/>

            <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
                <View style={{flexDirection: "column"}}>
                    <RadioButton.Group onValueChange={value => setWinner(setWg1, value)} value={wg1}>
                        <RadioButton.Item label={w1name} value={w1name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                        <RadioButton.Item label={w2name} value={w2name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                    </RadioButton.Group>
                </View>
                <Card style={{height: 50}}>
                    <Card.Content style={{justifyContent: "center", marginTop: -2}}>
                        <Paragraph ellipsizeMode='tail' numberOfLines={1} style={{width:100}}>
                            {wg1}
                        </Paragraph>
                    </Card.Content>
                </Card>
            </View>
            <Divider style={{height: 2}}/>

            <Button icon={"arrow-right"} disabled={nextDisabled} onPress={next}>
                NBA Finals
            </Button>
        </ScrollView>
    );
}

const NBAFinals = (props) => {
    const {eg1: e1name, wg1: w1name} = props.teams

    const [champion, setChampion] = useState(props.picks.champion === undefined  || !Object.values(props.teams).includes(props.picks.champion) ? 'Pick a champion' : props.picks.champion)

    const [nextDisabled, setNextDisabled] = useState(true)

    function setWinner(setter, winner) {
        setter(winner);
    }

    useEffect(tryNext, [champion, nextDisabled])

    function tryNext() {
        if (![champion].includes('Pick a champion')) {
            props.setNbaFinals({champion})
            setNextDisabled(false)
        }
    }
    
    function next() {
        props.setNbaFinals({champion})
        props.setRound(p => p + 1)
        props.submit()
    }

    return (
        <ScrollView style={{marginTop: 10, marginBottom: 100, flex: 1}}>
            <Button icon={"arrow-left"} disabled={false} onPress={() => props.setRound(p => p - 1)}>
                Back to Conference Finals
            </Button>

            <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
                <View style={{flexDirection: "column"}}>
                    <RadioButton.Group onValueChange={value => setWinner(setChampion, value)} value={champion}>
                        <RadioButton.Item label={e1name} value={e1name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                        <RadioButton.Item label={w1name} value={w1name} labelStyle={{width: 100}} color={"#FF69B4"}/>
                    </RadioButton.Group>
                </View>
                <Card style={{height: 50}}>
                    <Card.Content style={{justifyContent: "center", marginTop: -2}}>
                        <Paragraph ellipsizeMode='tail' numberOfLines={1} style={{width:100}}>
                            {champion}
                        </Paragraph>
                    </Card.Content>
                </Card>
            </View>
            <Divider style={{height: 2}}/>

            <Button icon={"arrow-right"} disabled={nextDisabled} onPress={next}>
                Submit your picks
            </Button>
        </ScrollView>
    );
}

const Overview = (props) => {

    console.log(JSON.stringify(props, null, 2))

    function Team(props) {
        return (
            <View style={{backgroundColor: "#CBE5CF", borderRadius: 10, height: "10%", justifyContent: "center"}}>
                <Paragraph style={{textAlign: "center", color: "green", fontSize: 14, marginRight: 5}} >
                    {props.team}
                </Paragraph>
            </View>
        );
    }

    return(
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start', marginHorizontal: 10}}>
            <Subheading style={{textAlign: "center", paddingTop: 20, fontSize: 24, color: 'grey'}}>YOUR PICKS</Subheading>
            <View style={{flex: 2, flexDirection: 'row'}}>
                <View style={{flex: 30, flexDirection: 'column', justifyContent: 'space-around'}}>
                    <Team team={props.firstRound.eg1} />
                    <Team team={props.firstRound.eg2} />
                    <Team team={props.firstRound.eg3} />
                    <Team team={props.firstRound.eg4} />
                    <Team team={props.firstRound.wg1} />
                    <Team team={props.firstRound.wg2} />
                    <Team team={props.firstRound.wg3} />
                    <Team team={props.firstRound.wg4} />
                </View>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around'}}>
                    <Divider style={{width: 4, height: "18%", backgroundColor: "#CBE5CF", marginLeft: -4}}/>
                    <Divider style={{width: 4, height: "18%", backgroundColor: "#CBE5CF", marginLeft: -4}}/>
                    <Divider style={{width: 4, height: "18%", backgroundColor: "#CBE5CF", marginLeft: -4}}/>
                    <Divider style={{width: 4, height: "18%", backgroundColor: "#CBE5CF", marginLeft: -4}}/>
                </View>
                <View style={{flex: 30, flexDirection: 'column', justifyContent: 'space-around'}}>
                    <Team team={props.confSemis.eg1} />
                    <Team team={props.confSemis.eg2} />
                    <Team team={props.confSemis.wg1} />
                    <Team team={props.confSemis.wg2} />
                </View>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around'}}>
                    <Divider style={{width: 4, height: "30%", backgroundColor: "#CBE5CF", marginLeft: -4}}/>
                    <Divider style={{width: 4, height: "30%", backgroundColor: "#CBE5CF", marginLeft: -4}}/>
                </View>
                <View style={{flex: 30, flexDirection: 'column', justifyContent: 'space-around'}}>
                    <Team team={props.confFinals.eg1} />
                    <Team team={props.confFinals.wg1} />
                </View>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around'}}>
                    <Divider style={{width: 4, height: "55%", backgroundColor: "#CBE5CF", marginLeft: -4}}/>
                </View>
                <View style={{flex: 32, flexDirection: 'column', justifyContent: 'space-around'}}>
                    <Card style={{backgroundColor: "pink", borderRadius: 15}}>
                        <Card.Content>
                            <Subheading style={{textAlign: "center", color: "white"}} >{props.nbaFinals.champion}</Subheading>
                        </Card.Content>
                    </Card>
                </View>
            </View>

        </View>
    );
}

