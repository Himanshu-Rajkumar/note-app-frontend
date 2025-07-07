"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { useAppContext } from "../Components/ContextAPI"
import { Button } from "../Styles/button"
import { Container, Grid, Card, Flex } from "../Components/GlobalStyle"
import HeroSection from "../Components/HeroSection"

const HomeContainer = styled.div`
  min-height: 100vh;
`

const Section = styled.section`
  padding: 4rem 0;
  background: ${(props) => props.bg || "transparent"};
`

const SectionTitle = styled.h2`
  font-size: 3.2rem;
  text-align: center;
  margin-bottom: 3rem;
  color: ${(props) => props.color || "#333"};
`

const NoteCard = styled(Card)`
  background: ${(props) => props.color || "white"};
  border-left: 4px solid ${(props) => (props.isFinancial ? "#27ae60" : "#667eea")};
  position: relative;
  
  ${(props) =>
    props.isPinned &&
    `
    &::before {
      content: '📌';
      position: absolute;
      top: 1rem;
      right: 1rem;
      font-size: 1.6rem;
    }
  `}
`

const NoteTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #2c3e50;
`

const NoteContent = styled.p`
  font-size: 1.4rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #555;
`

const NoteActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`

const ActionButton = styled.button`
  background: ${(props) => (props.variant === "danger" ? "#e74c3c" : "#667eea")};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background 0.3s ease;

  &:hover {
    background: ${(props) => (props.variant === "danger" ? "#c0392b" : "#5a67d8")};
  }
`

const NoteForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2c3e50;
`

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1.4rem;
  
  &:focus {
    border-color: #667eea;
    outline: none;
  }
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1.4rem;
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    border-color: #667eea;
    outline: none;
  }
`

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1.4rem;
  
  &:focus {
    border-color: #667eea;
    outline: none;
  }
`

const BudgetSummary = styled.div`
  background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 3rem;
  text-align: center;
`

const BudgetItem = styled.div`
  margin-bottom: 1rem;
  
  h4 {
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 2rem;
    font-weight: 700;
  }
`

const Home = () => {
  const { user, notes, budgetSummary, dispatch, token } = useAppContext()
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "personal",
    isFinancial: false,
    amount: "",
    transactionType: "expense",
    color: "#ffffff",
  })
  const [editingNote, setEditingNote] = useState(null)

  useEffect(() => {
    if (user && token) {
      fetchNotes()
      fetchBudgetSummary()
    }
  }, [user, token])

  const fetchNotes = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      dispatch({ type: "SET_NOTES", payload: data })
    } catch (error) {
      console.error("Error fetching notes:", error)
    }
  }

  const fetchBudgetSummary = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/notes/budget/summary`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      dispatch({ type: "SET_BUDGET_SUMMARY", payload: data })
    } catch (error) {
      console.error("Error fetching budget summary:", error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = editingNote ? `${process.env.REACT_APP_BASE_URL}/api/notes/${editingNote._id}` : `${process.env.REACT_APP_BASE_URL}/api/notes`

    const method = editingNote ? "PUT" : "POST"

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (editingNote) {
        dispatch({ type: "UPDATE_NOTE", payload: data })
      } else {
        dispatch({ type: "ADD_NOTE", payload: data })
      }

      setFormData({
        title: "",
        content: "",
        category: "personal",
        isFinancial: false,
        amount: "",
        transactionType: "expense",
        color: "#ffffff",
      })
      setEditingNote(null)

      if (formData.isFinancial) {
        fetchBudgetSummary()
      }
    } catch (error) {
      console.error("Error saving note:", error)
    }
  }

  const handleEdit = (note) => {
    setEditingNote(note)
    setFormData({
      title: note.title,
      content: note.content,
      category: note.category,
      isFinancial: note.isFinancial,
      amount: note.amount.toString(),
      transactionType: note.transactionType,
      color: note.color,
    })
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await fetch(`${process.env.REACT_APP_BASE_URL}/api/notes/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        dispatch({ type: "DELETE_NOTE", payload: id })
        fetchBudgetSummary()
      } catch (error) {
        console.error("Error deleting note:", error)
      }
    }
  }

  if (!user) {
    return (
      <HomeContainer>
        <HeroSection />
      </HomeContainer>
    )
  }

  return (
    <HomeContainer>
      <Container>
        <Section>
          <SectionTitle>My Notes Dashboard</SectionTitle>

          {budgetSummary && (
            <BudgetSummary>
              <h3>Budget Summary</h3>
              <Flex justify="space-around" align="center">
                <BudgetItem>
                  <h4>Total Income</h4>
                  <p>
                    {budgetSummary.currency}
                    {budgetSummary.totalIncome}
                  </p>
                </BudgetItem>
                <BudgetItem>
                  <h4>Total Expenses</h4>
                  <p>
                    {budgetSummary.currency}
                    {budgetSummary.totalExpenses}
                  </p>
                </BudgetItem>
                <BudgetItem>
                  <h4>Balance</h4>
                  <p style={{ color: budgetSummary.balance >= 0 ? "#2ecc71" : "#e74c3c" }}>
                    {budgetSummary.currency}
                    {budgetSummary.balance}
                  </p>
                </BudgetItem>
              </Flex>
            </BudgetSummary>
          )}

          <NoteForm onSubmit={handleSubmit}>
            <h3>{editingNote ? "Edit Note" : "Create New Note"}</h3>

            <FormGroup>
              <Label htmlFor="title">Title</Label>
              <Input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} required />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="content">Content</Label>
              <TextArea id="content" name="content" value={formData.content} onChange={handleInputChange} required />
            </FormGroup>

            <Flex gap="2rem">
              <FormGroup style={{ flex: 1 }}>
                <Label htmlFor="category">Category</Label>
                <Select id="category" name="category" value={formData.category} onChange={handleInputChange}>
                  <option value="personal">Personal</option>
                  <option value="work">Work</option>
                  <option value="finance">Finance</option>
                  <option value="shopping">Shopping</option>
                  <option value="other">Other</option>
                </Select>
              </FormGroup>

              <FormGroup style={{ flex: 1 }}>
                <Label htmlFor="color">Color</Label>
                <Input type="color" id="color" name="color" value={formData.color} onChange={handleInputChange} />
              </FormGroup>
            </Flex>

            <FormGroup>
              <Label>
                <input type="checkbox" name="isFinancial" checked={formData.isFinancial} onChange={handleInputChange} />{" "}
                Financial Transaction
              </Label>
            </FormGroup>

            {formData.isFinancial && (
              <Flex gap="2rem">
                <FormGroup style={{ flex: 1 }}>
                  <Label htmlFor="amount">Amount (₹)</Label>
                  <Input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                  />
                </FormGroup>

                <FormGroup style={{ flex: 1 }}>
                  <Label htmlFor="transactionType">Type</Label>
                  <Select
                    id="transactionType"
                    name="transactionType"
                    value={formData.transactionType}
                    onChange={handleInputChange}
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </Select>
                </FormGroup>
              </Flex>
            )}

            <Button type="submit">{editingNote ? "Update Note" : "Create Note"}</Button>
            {editingNote && (
              <Button
                type="button"
                onClick={() => {
                  setEditingNote(null)
                  setFormData({
                    title: "",
                    content: "",
                    category: "personal",
                    isFinancial: false,
                    amount: "",
                    transactionType: "expense",
                    color: "#ffffff",
                  })
                }}
                style={{ marginLeft: "1rem", background: "#95a5a6" }}
              >
                Cancel
              </Button>
            )}
          </NoteForm>

          <Grid>
            {notes.map((note) => (
              <NoteCard key={note._id} color={note.color} isFinancial={note.isFinancial} isPinned={note.isPinned}>
                <NoteTitle>{note.title}</NoteTitle>
                <NoteContent>{note.content}</NoteContent>

                <div style={{ marginBottom: "1rem" }}>
                  <span
                    style={{
                      display: "inline-block",
                      background: "#ecf0f1",
                      padding: "0.2rem 0.8rem",
                      borderRadius: "20px",
                      fontSize: "1.2rem",
                      marginRight: "1rem",
                    }}
                  >
                    {note.category}
                  </span>

                  {note.isFinancial && (
                    <span
                      style={{
                        display: "inline-block",
                        background: note.transactionType === "income" ? "#27ae60" : "#e74c3c",
                        color: "white",
                        padding: "0.2rem 0.8rem",
                        borderRadius: "20px",
                        fontSize: "1.2rem",
                      }}
                    >
                      {note.transactionType === "income" ? "+" : "-"}₹{note.amount}
                    </span>
                  )}
                </div>

                <NoteActions>
                  <ActionButton onClick={() => handleEdit(note)}>
                    <i className="fas fa-edit"></i> Edit
                  </ActionButton>
                  <ActionButton variant="danger" onClick={() => handleDelete(note._id)}>
                    <i className="fas fa-trash"></i> Delete
                  </ActionButton>
                </NoteActions>
              </NoteCard>
            ))}
          </Grid>

          {notes.length === 0 && (
            <div style={{ textAlign: "center", padding: "4rem 0" }}>
              <h3>No notes yet!</h3>
              <p>Create your first note to get started.</p>
            </div>
          )}
        </Section>
      </Container>
    </HomeContainer>
  )
}

export default Home
