import {createContext, useContext, useReducer} from "react";
import {reduce, once} from "lodash";


export async function getData() {
    let data = dataAsObject(data_strat);
    return data;
}

let collapseNodes = {};
function collapseDescendants() {

}
export function toggleNode(nodeId) {
    if (nodeId in collapseNodes) {
        if (collapseNodes[nodeId]) {
            delete collapseNodes[nodeId];
        } else {
            throw new Error('')
        }
    } else {
        collapseNodes[nodeId] = true;
    }

    let data = dataAsObject(data_strat);
    let hidden;
    for (const id of collapseDescendants) {
        hidden = reduce(collapseDescendants, (acc, val, key, data) => {
            for (const d of data[val]) {
                for (const p of d.parents) {
                    // no, have to keep nodes with uncollapsed parents,
                    // so probably go through each node and check if it has uncollapsed parents
                    acc[p] = true;
                }
            }
        }, {});
    }
    return data;
}
function removeDescendants(data, id) {

}
const dataAsObject = once((data) => {
    let obj = {};
    for (const d of data) {
        obj[d.id] = d;
    }
    return obj;
});

const data_strat = [
    {'id': '40483287', 'name': 'Disorder of kidney and/or ureter', 'color': '#D3D3D3', 'counts': 0, 'parents': ['75865'], 'children': ['198124']},
    {'id': '75865', 'name': 'Disorder of the urinary system', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4024000', '4171379'], 'children': ['40483287'], 'hidden': 'False'},
    {'id': '439846', 'name': 'Left heart failure', 'color': '#50C878', 'counts': 5, 'parents': ['316139', '4167693'], 'children': ['4242669'], 'hidden': 'False'},
    {'id': '316139', 'name': 'Heart failure', 'color': '#50C878', 'counts': 5, 'parents': ['4024552'], 'children': ['439846', '319835', '443580', '442310', '444031', '444101', '4172864', '443587', '4004279', '4273632'], 'hidden': 'False'},
    {'id': '319835', 'name': 'Congestive heart failure', 'color': '#50C878', 'counts': 5, 'parents': ['316139', '4166245'], 'children': ['4023479', '439696', '4229440', '4242669'], 'hidden': 'False'},
    {'id': '443580', 'name': 'Systolic heart failure', 'color': '#50C878', 'counts': 5, 'parents': ['316139', '139036'], 'children': ['40480603', '40479192'], 'hidden': 'False'},
    {'id': '442310', 'name': 'Acute heart failure', 'color': '#D3D3D3', 'counts': 0, 'parents': ['316139', '4132088'], 'children': ['4023479', '40481042', '40480603', '4233424'], 'hidden': 'False'},
    {'id': '444031', 'name': 'Chronic heart failure', 'color': '#D3D3D3', 'counts': 0, 'parents': ['316139', '4134586'], 'children': ['40479576', '4014159', '4229440', '40479192'], 'hidden': 'False'},
    {'id': '444101', 'name': 'Hypertensive heart failure', 'color': '#50C878', 'counts': 5, 'parents': ['316139', '442604'], 'children': [], 'hidden': 'False'},
    {'id': '4172864', 'name': 'Neonatal cardiac failure', 'color': '#50C878', 'counts': 5, 'parents': ['316139', '4180943'], 'children': [], 'hidden': 'False'},
    {'id': '443587', 'name': 'Diastolic heart failure', 'color': '#50C878', 'counts': 5, 'parents': ['316139', '141038'], 'children': ['40479576', '40481042'], 'hidden': 'False'},
    {'id': '4004279', 'name': 'High output heart failure', 'color': '#50C878', 'counts': 5, 'parents': ['316139'], 'children': [], 'hidden': 'False'},
    {'id': '4273632', 'name': 'Right ventricular failure', 'color': '#50C878', 'counts': 5, 'parents': ['316139', '4165905'], 'children': ['4014159', '4233424', '4242669', '4195785'], 'hidden': 'False'},
    {'id': '4167693', 'name': 'Disorder of left cardiac ventricle', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4166245', '4103184'], 'children': ['439846'], 'hidden': 'False'},
    {'id': '4023479', 'name': 'Acute congestive heart failure', 'color': '#D3D3D3', 'counts': 0, 'parents': ['442310', '319835'], 'children': ['44782655'], 'hidden': 'False'},
    {'id': '40481042', 'name': 'Acute diastolic heart failure', 'color': '#50C878', 'counts': 5, 'parents': ['442310', '443587'], 'children': ['40481043', '44782718'], 'hidden': 'False'},
    {'id': '40480603', 'name': 'Acute systolic heart failure', 'color': '#50C878', 'counts': 5, 'parents': ['442310', '443580'], 'children': ['40480602', '44782718'], 'hidden': 'False'},
    {'id': '4233424', 'name': 'Acute right-sided heart failure', 'color': '#50C878', 'counts': 5, 'parents': ['442310', '4273632'], 'children': [], 'hidden': 'False'},
    {'id': '439696', 'name': 'Hypertensive heart and renal disease with (congestive) heart failure', 'color': '#50C878', 'counts': 5, 'parents': ['319835', '195556'], 'children': [], 'hidden': 'False'},
    {'id': '4229440', 'name': 'Chronic congestive heart failure', 'color': '#50C878', 'counts': 5, 'parents': ['319835', '444031'], 'children': ['4284562', '44782655'], 'hidden': 'False'},
    {'id': '4242669', 'name': 'Biventricular congestive heart failure', 'color': '#50C878', 'counts': 5, 'parents': ['319835', '4273632', '439846'], 'children': [], 'hidden': 'False'},
    {'id': '141038', 'name': 'Diastolic dysfunction', 'color': '#D3D3D3', 'counts': 0, 'parents': ['138255'], 'children': ['40482727', '443587'], 'hidden': 'False'},
    {'id': '138255', 'name': 'Abnormal cardiovascular function', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4115558'], 'children': ['141038', '139036'], 'hidden': 'False'},
    {'id': '139036', 'name': 'Systolic dysfunction', 'color': '#D3D3D3', 'counts': 0, 'parents': ['138255'], 'children': ['443580', '40482727'], 'hidden': 'False'},
    {'id': '4028244', 'name': 'Chronic disease of cardiovascular system', 'color': '#D3D3D3', 'counts': 0, 'parents': ['443783', '134057'], 'children': ['4134586'], 'hidden': 'False'},
    {'id': '443783', 'name': 'Chronic disease', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4274025'], 'children': ['4028244'], 'hidden': 'False'},
    {'id': '134057', 'name': 'Disorder of cardiovascular system', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4023995', '4180628'], 'children': ['4028244', '4028367', '321588', '4180943'], 'hidden': 'False'},
    {'id': '4028367', 'name': 'Acute disease of cardiovascular system', 'color': '#D3D3D3', 'counts': 0, 'parents': ['134057', '443883'], 'children': ['4132088'], 'hidden': 'False'},
    {'id': '321588', 'name': 'Heart disease', 'color': '#D3D3D3', 'counts': 0, 'parents': ['134057', '440142', '4103183'], 'children': ['4132088', '4027255', '4134586', '4239975', '4166245', '4024552', '442604'], 'hidden': 'False'},
    {'id': '4180943', 'name': 'Neonatal cardiovascular disorder', 'color': '#D3D3D3', 'counts': 0, 'parents': ['134057', '4042220'], 'children': ['4172864'], 'hidden': 'False'},
    {'id': '195556', 'name': 'Hypertensive heart AND renal disease', 'color': '#D3D3D3', 'counts': 0, 'parents': ['442604', '201313'], 'children': ['439696'], 'hidden': 'False'},
    {'id': '4166245', 'name': 'Disorder of cardiac ventricle', 'color': '#D3D3D3', 'counts': 0, 'parents': ['321588'], 'children': ['319835', '4167693', '4165905'], 'hidden': 'False'},
    {'id': '4165905', 'name': 'Disorder of right cardiac ventricle', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4166245', '4116633'], 'children': ['4273632'], 'hidden': 'False'},
    {'id': '320746', 'name': 'Cardiomyopathy associated with another disorder', 'color': '#50C878', 'counts': 5, 'parents': ['321319'], 'children': ['4071896'], 'hidden': 'False'},
    {'id': '321319', 'name': 'Cardiomyopathy', 'color': '#50C878', 'counts': 5, 'parents': ['4239975'], 'children': ['320746', '4163710', '4190773'], 'hidden': 'False'},
    {'id': '4163710', 'name': 'Dilated cardiomyopathy', 'color': '#50C878', 'counts': 11, 'parents': ['321319', '4027255'], 'children': ['4071896', '42872390'], 'hidden': 'False'},
    {'id': '4190773', 'name': 'Restrictive cardiomyopathy', 'color': '#50C878', 'counts': 5, 'parents': ['321319'], 'children': [], 'hidden': 'False'},
    {'id': '4132088', 'name': 'Acute heart disease', 'color': '#D3D3D3', 'counts': 0, 'parents': ['321588', '4028367'], 'children': ['442310'], 'hidden': 'False'},
    {'id': '4027255', 'name': 'Structural disorder of heart', 'color': '#D3D3D3', 'counts': 0, 'parents': ['321588'], 'children': ['4163710'], 'hidden': 'False'},
    {'id': '4134586', 'name': 'Chronic heart disease', 'color': '#D3D3D3', 'counts': 0, 'parents': ['321588', '4028244'], 'children': ['444031'], 'hidden': 'False'},
    {'id': '4239975', 'name': 'Myocardial disease', 'color': '#D3D3D3', 'counts': 0, 'parents': ['321588', '4108611'], 'children': ['4124706', '321319'], 'hidden': 'False'},
    {'id': '4024552', 'name': 'Disorder of cardiac function', 'color': '#D3D3D3', 'counts': 0, 'parents': ['321588'], 'children': ['316139'], 'hidden': 'False'},
    {'id': '442604', 'name': 'Hypertensive heart disease', 'color': '#D3D3D3', 'counts': 0, 'parents': ['321588', '42709887'], 'children': ['444101', '195556'], 'hidden': 'False'},
    {'id': '40479576', 'name': 'Chronic diastolic heart failure', 'color': '#50C878', 'counts': 16, 'parents': ['443587', '444031'], 'children': ['44782719', '40481043'], 'hidden': 'False'},
    {'id': '4014159', 'name': 'Chronic right-sided heart failure', 'color': '#50C878', 'counts': 5, 'parents': ['444031', '4273632'], 'children': ['4284562'], 'hidden': 'False'},
    {'id': '40479192', 'name': 'Chronic systolic heart failure', 'color': '#50C878', 'counts': 5, 'parents': ['444031', '443580'], 'children': ['44782719', '40480602'], 'hidden': 'False'},
    {'id': '40482727', 'name': 'Combined systolic and diastolic dysfunction', 'color': '#50C878', 'counts': 15, 'parents': ['139036', '141038'], 'children': ['44782719', '44782718'], 'hidden': 'False'},
    {'id': '443883', 'name': 'Acute disease', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4274025'], 'children': ['4028367'], 'hidden': 'False'},
    {'id': '4042220', 'name': 'Neonatal disorder', 'color': '#D3D3D3', 'counts': 0, 'parents': ['441406'], 'children': ['4180943'], 'hidden': 'False'},
    {'id': '441406', 'name': 'Disorder of fetus or newborn', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4274025'], 'children': ['4042220'], 'hidden': 'False'},
    {'id': '4195785', 'name': 'Right heart failure secondary to left heart failure', 'color': '#50C878', 'counts': 5, 'parents': ['4273632'], 'children': [], 'hidden': 'False'},
    {'id': '201313', 'name': 'Hypertensive renal disease', 'color': '#D3D3D3', 'counts': 0, 'parents': ['198124', '42709887'], 'children': ['195556'], 'hidden': 'False'},
    {'id': '37116972', 'name': 'Disorder of retroperitoneum', 'color': '#D3D3D3', 'counts': 0, 'parents': ['444089'], 'children': ['198124'], 'hidden': 'False'},
    {'id': '444089', 'name': 'Disorder of abdomen', 'color': '#D3D3D3', 'counts': 0, 'parents': ['37311677', '43531058'], 'children': ['37116972'], 'hidden': 'False'},
    {'id': '440142', 'name': 'Disorder of mediastinum', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4180628', '4115390', '4043346'], 'children': ['321588'], 'hidden': 'False'},
    {'id': '4103183', 'name': 'Cardiac finding', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4023995', '4115390', '4227253'], 'children': ['321588', '4103184', '4116633', '4108611'], 'hidden': 'False'},
    {'id': '4103184', 'name': 'Finding of left ventricle', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4103183'], 'children': ['4167693'], 'hidden': 'False'},
    {'id': '4116633', 'name': 'Finding of right ventricle', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4103183'], 'children': ['4165905'], 'hidden': 'False'},
    {'id': '4108611', 'name': 'Myocardial finding', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4103183'], 'children': ['4239975'], 'hidden': 'False'},
    {'id': '198124', 'name': 'Kidney disease', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4091056', '37116972', '40483287'], 'children': ['201313'], 'hidden': 'False'},
    {'id': '42709887', 'name': 'Hypertensive complication', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4274025'], 'children': ['201313', '442604'], 'hidden': 'False'},
    {'id': '4274025', 'name': 'Disease', 'color': '#D3D3D3', 'counts': 0, 'parents': ['441840'], 'children': ['4047779', '443883', '42709887', '443783', '441406'], 'hidden': 'False'},
    {'id': '441840', 'name': 'Clinical finding', 'color': '#D3D3D3', 'counts': 0, 'parents': [], 'children': ['4274025', '4042140'], 'hidden': 'False'},
    {'id': '4042140', 'name': 'Finding by site', 'color': '#D3D3D3', 'counts': 0, 'parents': ['441840'], 'children': ['4227253', '4047779', '4023995', '4199402'], 'hidden': 'False'},
    {'id': '4071896', 'name': 'Secondary dilated cardiomyopathy', 'color': '#D3D3D3', 'counts': 0, 'parents': ['320746', '4163710'], 'children': ['44783568'], 'hidden': 'False'},
    {'id': '42872390', 'name': 'Nonischemic congestive cardiomyopathy', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4163710'], 'children': ['44783568'], 'hidden': 'False'},
    {'id': '4284562', 'name': 'Chronic right-sided congestive heart failure', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4014159', '4229440'], 'children': ['37309625'], 'hidden': 'False'},
    {'id': '44782655', 'name': 'Acute exacerbation of chronic congestive heart failure', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4229440', '4023479'], 'children': ['37309625'], 'hidden': 'False'},
    {'id': '4023995', 'name': 'Cardiovascular finding', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4042140'], 'children': ['134057', '4115558', '4103183'], 'hidden': 'False'},
    {'id': '4115558', 'name': 'Cardiovascular function finding', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4023995'], 'children': ['138255'], 'hidden': 'False'},
    {'id': '4180628', 'name': 'Disorder of body system', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4047779'], 'children': ['134057', '4171379', '440142'], 'hidden': 'False'},
    {'id': '4171379', 'name': 'Disorder of the genitourinary system', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4180628', '4041285', '37311677'], 'children': ['75865'], 'hidden': 'False'},
    {'id': '43531056', 'name': 'Disorder of thoracic segment of trunk', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4028071', '43531057'], 'children': ['4043346'], 'hidden': 'False'},
    {'id': '4028071', 'name': 'Disorder of trunk', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4047779', '4117930'], 'children': ['43531056', '37311677'], 'hidden': 'False'},
    {'id': '37311677', 'name': 'Disorder of abdominopelvic segment of trunk', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4028071', '37311678'], 'children': ['4171379', '444089'], 'hidden': 'False'},
    {'id': '43531057', 'name': 'Finding of upper trunk', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4117930'], 'children': ['43531056', '4185503'], 'hidden': 'False'},
    {'id': '4185503', 'name': 'Finding of region of thorax', 'color': '#D3D3D3', 'counts': 0, 'parents': ['43531057'], 'children': ['4115390', '4043346'], 'hidden': 'False'},
    {'id': '4115390', 'name': 'Mediastinal finding', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4185503'], 'children': ['4103183', '440142'], 'hidden': 'False'},
    {'id': '4227253', 'name': 'Viscus structure finding', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4042140'], 'children': ['4103183', '4096864'], 'hidden': 'False'},
    {'id': '4096864', 'name': 'Abdominal organ finding', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4227253', '43531058'], 'children': ['4091056'], 'hidden': 'False'},
    {'id': '4024000', 'name': 'Urinary system finding', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4041285'], 'children': ['75865', '4091056'], 'hidden': 'False'},
    {'id': '4091056', 'name': 'Kidney finding', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4024000', '4096864'], 'children': ['198124'], 'hidden': 'False'},
    {'id': '37311678', 'name': 'Finding of abdominopelvic segment of trunk', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4117930'], 'children': ['37311677', '4041285', '43531058'], 'hidden': 'False'},
    {'id': '4041285', 'name': 'Urogenital finding', 'color': '#D3D3D3', 'counts': 0, 'parents': ['37311678'], 'children': ['4171379', '4024000'], 'hidden': 'False'},
    {'id': '43531058', 'name': 'Finding of abdomen', 'color': '#D3D3D3', 'counts': 0, 'parents': ['37311678'], 'children': ['4096864', '444089'], 'hidden': 'False'},
    {'id': '4110961', 'name': 'Generalized ischemic myocardial dysfunction', 'color': '#50C878', 'counts': 5, 'parents': ['4092936'], 'children': [], 'hidden': 'False'},
    {'id': '4092936', 'name': 'Ischemic myocardial dysfunction', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4124706'], 'children': ['4110961'], 'hidden': 'False'},
    {'id': '44783568', 'name': 'Secondary nonischemic congestive cardiomyopathy', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4071896', '42872390'], 'children': ['318773'], 'hidden': 'False'},
    {'id': '4047779', 'name': 'Disorder by body site', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4042140', '4274025'], 'children': ['4028071', '4180628'], 'hidden': 'False'},
    {'id': '4199402', 'name': 'Finding of body region', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4042140'], 'children': ['4117930'], 'hidden': 'False'},
    {'id': '4117930', 'name': 'Finding of trunk structure', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4199402'], 'children': ['4028071', '43531057', '37311678'], 'hidden': 'False'},
    {'id': '4043346', 'name': 'Disorder of thorax', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4185503', '43531056'], 'children': ['440142'], 'hidden': 'False'},
    {'id': '4124706', 'name': 'Myocardial dysfunction', 'color': '#D3D3D3', 'counts': 0, 'parents': ['4239975'], 'children': ['4092936'], 'hidden': 'False'},
    {'id': '37309625', 'name': 'Acute on chronic right-sided congestive heart failure', 'color': '#50C878', 'counts': 5, 'parents': ['4284562', '44782655'], 'children': [], 'hidden': 'False'},
    {'id': '44782719', 'name': 'Chronic combined systolic and diastolic heart failure', 'color': '#50C878', 'counts': 5, 'parents': ['40479576', '40479192', '40482727'], 'children': ['44782733'], 'hidden': 'False'},
    {'id': '40481043', 'name': 'Acute on chronic diastolic heart failure', 'color': '#50C878', 'counts': 5, 'parents': ['40479576', '40481042'], 'children': ['44782733'], 'hidden': 'False'},
    {'id': '40480602', 'name': 'Acute on chronic systolic heart failure', 'color': '#50C878', 'counts': 25, 'parents': ['40479192', '40480603'], 'children': ['44782733'], 'hidden': 'False'},
    {'id': '44782718', 'name': 'Acute combined systolic and diastolic heart failure', 'color': '#50C878', 'counts': 5, 'parents': ['40482727', '40480603', '40481042'], 'children': ['44782733'], 'hidden': 'False'},
    {'id': '44782733', 'name': 'Acute on chronic combined systolic and diastolic heart failure', 'color': '#50C878', 'counts': 5, 'parents': ['40481043', '40480602', '44782718', '44782719'], 'children': [], 'hidden': 'False'},
    {'id': '318773', 'name': 'Dilated cardiomyopathy secondary to alcohol', 'color': '#50C878', 'counts': 5, 'parents': ['44783568'], 'children': [], 'hidden': 'False'}

];
/*
export const dataReducer = (state, action) => {
  if (!action || !action.type) return state;
  let {type, id, } = action;
  if (!id) {
    throw new Error(`alertAction requires an id`, alert);
  }

  let alert = state[id];
  if (type === 'create') {
    if (alert) {
      throw new Error(`alert with id ${id} already exists`, alert);
    }
    alert = {
      ...action,
      id: id ?? Object.keys(state).length,
      status: 'unread',
      severity: 'info',
    };
  } else if (type === 'resolve') {
    alert = {...alert, ...action, status: 'complete', severity: 'success', };
  } else if (type === 'error') {
    alert = {...alert, ...action, status: 'error', severity: 'error', };
  } else {
    throw new Error(`bad alert type: ${type}`);
  }
  return {[alert.id]: alert, ...state, };
}

const DataContext = createContext(null);
const DataDispatchContext = createContext(null);
export function DataProvider({ children }) {
  const [data, dispatch] = useReducer(dataReducer, {});

  return (
      <DataContext.Provider value={data}>
        <DataDispatchContext.Provider value={dispatch}>
          {children}
        </DataDispatchContext.Provider>
      </DataContext.Provider>
  );
}
export function useData() {
  return useContext(DataContext);
}
export function useDataDispatch() {
  return useContext(DataDispatchContext);
}
 */
