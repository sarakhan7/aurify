import React from 'react'

const ScenarioDropdown = ({ selectedScenario, onScenarioChange }) => {
  const scenarios = [
    { id: 'tech-interview', name: 'Tech Interview', description: 'Practice coding questions and system design' },
    { id: 'standup', name: 'Standup Meeting', description: 'Daily standup updates and progress reports' },
    { id: 'sales-pitch', name: 'Sales Pitch', description: 'Product demos and sales presentations' },
    { id: 'public-speaking', name: 'Public Speaking', description: 'Presentations and speeches' },
    { id: 'custom', name: 'Custom Scenario', description: 'Define your own practice scenario' }
  ]

  return (
    <div className="scenario-selector">
      <label className="text-lg font-semibold mb-0" style={{color: '#fff', marginBottom: '8px'}}>
        Choose Your Scenario
      </label>
      <select 
        value={selectedScenario} 
        onChange={(e) => onScenarioChange(e.target.value)}
        className="input"
        style={{fontSize: '1rem', padding: '12px 16px'}}
      >
        {scenarios.map(scenario => (
          <option key={scenario.id} value={scenario.id}>
            {scenario.name}
          </option>
        ))}
      </select>
      {selectedScenario && (
        <p className="text-sm mt-0" style={{color: '#ccc', marginTop: '8px'}}>
          {scenarios.find(s => s.id === selectedScenario)?.description}
        </p>
      )}
    </div>
  )
}

export default ScenarioDropdown 