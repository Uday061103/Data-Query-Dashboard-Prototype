import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulate API call
export const processQuery = createAsyncThunk(
  'query/process',
  async (query) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock different types of responses based on query content
    const response = {
      data: query.toLowerCase().includes('monthly') ? [
        { month: 'Jan', value: Math.floor(Math.random() * 1000) },
        { month: 'Feb', value: Math.floor(Math.random() * 1000) },
        { month: 'Mar', value: Math.floor(Math.random() * 1000) },
        { month: 'Apr', value: Math.floor(Math.random() * 1000) },
        { month: 'May', value: Math.floor(Math.random() * 1000) },
      ] : query.toLowerCase().includes('region') ? [
        { region: 'North', value: Math.floor(Math.random() * 1000) },
        { region: 'South', value: Math.floor(Math.random() * 1000) },
        { region: 'East', value: Math.floor(Math.random() * 1000) },
        { region: 'West', value: Math.floor(Math.random() * 1000) },
      ] : [
        { category: 'Product A', value: Math.floor(Math.random() * 1000) },
        { category: 'Product B', value: Math.floor(Math.random() * 1000) },
        { category: 'Product C', value: Math.floor(Math.random() * 1000) },
      ],
      metadata: {
        type: query.toLowerCase().includes('trend') ? 'line' : 
              query.toLowerCase().includes('compare') ? 'bar' : 
              query.toLowerCase().includes('distribution') ? 'pie' : 'table',
        xAxis: 'category',
        yAxis: 'value',
        title: query,
        yAxisSuffix: query.toLowerCase().includes('revenue') ? '$' : '',
      },
      summary: `Analysis based on your query: "${query}". The data shows significant patterns that might be worth investigating further.`
    };

    return response;
  }
);

const initialState = {
  currentQuery: '',
  queryHistory: [],
  results: null,
  suggestions: [
    'Show monthly sales trend for Q1 2024',
    'Compare revenue by region for last 6 months',
    'What are the top 5 performing products?',
    'Show customer demographics by age group',
    'Display sales distribution by category',
    'Analyze year-over-year growth rate'
  ],
  isLoading: false,
  error: null,
  visualizationType: 'bar'
};

const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setCurrentQuery: (state, action) => {
      state.currentQuery = action.payload;
    },
    clearResults: (state) => {
      state.results = null;
    },
    setVisualizationType: (state, action) => {
      state.visualizationType = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(processQuery.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(processQuery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.results = action.payload;
        state.queryHistory.unshift({
          query: state.currentQuery,
          timestamp: new Date().toISOString(),
          results: action.payload
        });
      })
      .addCase(processQuery.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'Failed to process query';
      });
  }
});

export const { setCurrentQuery, clearResults, setVisualizationType, setError } = querySlice.actions;
export default querySlice.reducer;



