class Rows extends React.Component {

        constructor(props){
          super(props)
          this.url = props.url;
          this.snippet = props.snippet;
          this.title = props.title
          this.state = {'data': []};
          this.setData = this.setData.bind(this);
        }

        setData(dataToSet){
          this.setState({'data': dataToSet});
        }

        componentDidMount(){
          var link = this.url;
          var apiKey = '5a958af6214a1dbbd93eaf25225110ca26eb66da77328';
          var url = `https://api.linkpreview.net/?key=${apiKey}&q=${link}`;
      
        $.ajax({
              url: url,
              method: 'GET',
            }).done(
              this.setData
            ).fail(function(err) {
                throw err;
          });
          
        }

        render() {
          var data = this.state.data;
          
          if(data == 0){
            return <div className="result">
                  <a href = {this.url} target='_blank'><h3>{this.title}</h3>
                  <div> 
                    <p>{this.snippet}</p>
                  </div></a>
                </div>;
          }
          

          return <div className="result">
                <a href= {data.url} target="_blank"><h3>{data.title}</h3></a>
                <div>
                    <img src={data.image}/>
                </div>
                <div> 
                  <p>{data.description}</p>
                </div>
              </div>;
        }

      }

      class App extends React.Component {
        constructor(props){
          super(props)
          this.year = props.year;
          this.month = props.month;
          this.state = {'data': []};
          this.setData = this.setData.bind(this);
        }


        setData(dataToSet){
          this.setState({'data': dataToSet});
        }

        componentDidMount(){
          var year = this.year;
          var month = this.month;
          var url = `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json`;
        url += '?' + $.param({
                  'api-key': "3435738fa15c4c11ba5502b3f1623b3c"
              });
        $.ajax({
              url: url,
              method: 'GET',
            }).done(
              this.setData
            ).fail(function(err) {
                throw err;
          });
          
        }

        render() {
          const resivedData = this.state.data;
                console.log(resivedData);

          if(resivedData.length == 0){
                    return <p>Loading...</p>;
                }

          var top20 = [];
          
          for(var i = 0; i < 20; i++){
            top20.push(             
                <Rows
                  key = {i} 
                  url = {resivedData.response.docs[i].web_url}
                  snippet =  {resivedData.response.docs[i].snippet}
                  title = {resivedData.response.docs[i].headline.main}
                />
                
              )
          }

          var print =  <div>
                                <div className = 'container'>{top20}</div>
                              </div>;

          return print;
          
        }

      }

      function find() {
        
        const month = document.getElementById('month').value;
        const year = document.getElementById('year').value;
        const root = document.getElementById('root');
        ReactDOM.unmountComponentAtNode(root);
        ReactDOM.render(<App year = {year} month = {month} />,  root);
    }